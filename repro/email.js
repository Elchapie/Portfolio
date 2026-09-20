/**
 * repro: the enquiry form refuses real addresses.
 *
 *   npm run repro:email
 *
 * The studio's own address ends in .co.uk, and a lot of the people who write
 * in have short endings too.
 */

import { validateEmail } from '../src/contact.js';

const shouldPass = [
  'studio@philpmaxwel.co.uk',
  'hello@studio.io',
  'press@label.co',
  'someone@example.com',
];

const shouldFail = ['', '   ', 'philp@', 'philp@maxwel', 'not-an-address'];

let failures = 0;

for (const address of shouldPass) {
  const result = validateEmail(address);
  if (!result.ok) {
    console.log(`FAIL ${JSON.stringify(address)} was refused: ${result.reason}`);
    failures += 1;
  } else {
    console.log(`ok   ${address}`);
  }
}

for (const address of shouldFail) {
  const result = validateEmail(address);
  if (result.ok) {
    console.log(`FAIL ${JSON.stringify(address)} was accepted`);
    failures += 1;
  } else {
    console.log(`ok   ${JSON.stringify(address)} refused`);
  }
}

if (failures > 0) {
  console.error(`\nFAIL: ${failures} address(es) handled wrongly.`);
  process.exit(1);
}

console.log('\nPASS: real addresses are accepted, malformed ones are not.');
