// Isolated browser QA: real option reads, simulated booking writes only.
// Run: node node_modules/vite/bin/vite.js --config tests/vite.appointment.config.ts --configLoader runner --port 5174
import { mergeConfig } from 'vite';
import base from '../vite.config';
export default mergeConfig(base, {
  plugins: [{
    name: 'appointment-browser-fixture', enforce: 'pre',
    resolveId(id: string) {
      if (id === '../services/appointments') return '\0appointment-fixture';
    },
    load(id: string) {
      if (id !== '\0appointment-fixture') return;
      return `
        let firstPayload;
        let calls = 0;
        export async function requestAppointment(input) {
          calls++;
          await new Promise(resolve => setTimeout(resolve, 700));
          if (calls === 1) {
            firstPayload = JSON.stringify(input);
            throw new Error('Simulated network error. Please try again.');
          }
          if (calls === 2 && JSON.stringify(input) !== firstPayload) throw new Error('TEST FAILED: retry payload or key changed');
          if (input.fullName !== 'Browser Test' || input.phone !== '9876543210' || input.email !== 'browser@example.com') throw new Error('TEST FAILED: contact normalization');
          if (!Number.isInteger(input.branchId) || !input.requestKey) throw new Error('TEST FAILED: missing branch ID or request key');
          return {id:'00000000-0000-4000-8000-000000000001', status:'pending'};
        }
      `;
    },
  }],
});
