export const TEMPLATE_LIST = [
  {
    id: 'diffusion1',
    name: 'Stable Diffusion T4',
    cpu: 4,
    ram: 16,
    gpu: 'Tesla T4 12GB',
    notes: 'Automatic1111 is preinstalled with ControlNet & Dreambooth. Ten different models isntalled.',
    url: (ip: string) => `http://${ip}:7860`
  },
  {
    id: 'tiny',
    name: 'Docker Small',
    cpu: 2,
    ram: 4,
    notes: 'Docker and Portainer preinstalled.',
    url: (ip: string) => `http://${ip}:9000`
  },
  {
    id: 'diffusion2',
    name: 'Stable Diffusion A100',
    cpu: 8,
    ram: 32,
    gpu: 'Tesla A100 32GB',
    notes: 'Automatic1111 is preinstalled with ControlNet & Dreambooth. Ten different models isntalled.',
    url: (ip: string) => `http://${ip}:9000`
  },
  {
    id: 'large',
    name: 'Docker Large',
    cpu: 2,
    ram: 8,
    notes: 'Docker',
    url: (ip: string) => `http://${ip}:9000`
  }
];

export const SERVER_LIST = [{
  id: 'g4dn.xlarge',
}, {
  id: 't2.micro'
}];

export const REGIONS: { [key: number]: [string, string] } = {
  1: ['us-east-2', 'US East'],
  2: ['us-west-2', 'US West'],
  3: ['Europe', 'Europe'],
  4: ['Asia', 'Asia']
};
