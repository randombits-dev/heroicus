export const TEMPLATE_LIST = [
  {
    id: 'diffusion1',
    name: 'Stable Diffusion',
    cpu: 4,
    ram: 16,
    gpu: 'Tesla T4 12GB',
    notes: 'Automatic1111 is preinstalled with ControlNet & Dreambooth. Ten different models isntalled.'
  },
  {
    id: 'tiny',
    name: 'Tiny',
    cpu: 1,
    ram: 1,
    notes: 'Mock Automatic1111 API'
  }
];

export const SERVER_LIST = [{
  id: 'g4dn.xlarge',
}, {
  id: 't2.micro'
}];

export const REGIONS = {
  1: 'US-East',
  2: 'US-West',
  3: 'Europe',
  4: 'Asia'
};
