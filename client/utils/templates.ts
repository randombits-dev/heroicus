export const TEMPLATE_LIST = [
  {
    id: 'diffusion.xlarge',
    name: 'Stable Diffusion T4',
    cpu: 4,
    ram: 16,
    gpu: 'Tesla T4 12GB',
    notes: 'Automatic1111 is preinstalled with ControlNet & Dreambooth. Ten different models isntalled.',
    url: (ip: string) => `http://${ip}:7860`,
    metadata: 'ipfs://bafkreibg6lnujfx67jrx6ppka5lt3vzrqug5g4mmfa6jes7szr2tv2oybu'
  },
  {
    id: 'docker.medium',
    name: 'Docker Medium',
    cpu: 2,
    ram: 4,
    notes: 'Docker and Portainer preinstalled.',
    url: (ip: string) => `http://${ip}:9000`,
    metadata: 'ipfs://bafkreigerughqlsdku4nmaldeugvbty7vgwe5ehc2y2xkrx4ddexvyvrzm'
  },
  // {
  //   id: 'diffusion2',
  //   name: 'Stable Diffusion A100',
  //   cpu: 8,
  //   ram: 32,
  //   gpu: 'Tesla A100 32GB',
  //   notes: 'Automatic1111 is preinstalled with ControlNet & Dreambooth. Ten different models isntalled.',
  //   url: (ip: string) => `http://${ip}:9000`
  // },
  // {
  //   id: 'large',
  //   name: 'Docker Large',
  //   cpu: 2,
  //   ram: 8,
  //   notes: 'Docker',
  //   url: (ip: string) => `http://${ip}:9000`
  // }
];

export const SERVER_LIST = [{
  id: 'g4dn.xlarge',
}, {
  id: 't2.medium'
}];

export const REGIONS: { [key: number]: [string, string] } = {
  1: ['us-east-1', 'US East'],
  2: ['us-east-2', 'US Central'],
  3: ['us-west-1', 'US South West'],
  4: ['us-west-2', 'US North West'],
  5: ['eu-central-1', 'Europe'],
  6: ['ap-northeast-2', 'Asia']
};
