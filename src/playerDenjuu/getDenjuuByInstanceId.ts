import { PlayerDenjuu, PlayerDenjuuContactList } from './types';

export const getDenjuuByInstanceId = (
    denjuuInstanceId: PlayerDenjuu['instanceId'],
    contactList: PlayerDenjuuContactList['denjuu']
) => contactList.find(({ instanceId }) => denjuuInstanceId === instanceId)!;
