export const TEMPLATE_LIST = [
  {
    id: 'diffusion.xlarge',
    name: 'Stable Diffusion',
    cpu: 4,
    ram: 16,
    gpu: 'Tesla T4 16GB',
    notes: 'Automatic1111 is preinstalled.',
    url: (ip: string) => `http://${ip}:7860`,
    metadata: 'ipfs://bafkreibg6lnujfx67jrx6ppka5lt3vzrqug5g4mmfa6jes7szr2tv2oybu'
  },
  {
    id: 'docker.medium',
    name: 'Docker',
    cpu: 2,
    ram: 4,
    notes: 'Docker and Portainer preinstalled.',
    url: (ip: string) => `http://${ip}:9000`,
    metadata: 'ipfs://bafkreigerughqlsdku4nmaldeugvbty7vgwe5ehc2y2xkrx4ddexvyvrzm'
  },
  {
    id: 'docker.micro',
    name: 'Micro Docker',
    cpu: 1,
    ram: 1,
    notes: 'A lightweight and cheaper alternative to the regular docker. Docker and Portainer preinstalled.',
    url: (ip: string) => `http://${ip}:9000`,
    metadata: 'ipfs://bafkreigerughqlsdku4nmaldeugvbty7vgwe5ehc2y2xkrx4ddexvyvrzm'
  }
];

export const SERVER_LIST = [{
  id: 'g4dn.xlarge',
}, {
  id: 't2.medium'
}, {
  id: 't2.micro'
}];

export const REGIONS: { [key: number]: [string, string] } = {
  1: ['us-east-2', 'US East'],
  2: ['us-west-2', 'US West'],
  // 3: ['eu-central-1', 'Europe'],
  // 4: ['ap-northeast-2', 'Asia']
};

export const getRegionId = (num: any) => {
  return REGIONS[num][0];
};
