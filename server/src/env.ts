require('dotenv').config();

export const ENV = {
  PROJECT: process.env['PROJECT_ID'],
  REGION: process.env['REGION_ID'],
  INSTANCE: process.env['INSTANCE_ID'],
  LAUNCH_TEMPLATE_G4DN: process.env['LAUNCH_TEMPLATE_G4DN'],
};
