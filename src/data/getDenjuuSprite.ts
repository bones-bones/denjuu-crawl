import { denjuuList } from "./denjuu"

export const getDenjuuSprite = (denjuuId: number, action: boolean = false, front: boolean = true) => {
    const { sprites } = denjuuList[denjuuId]
    if (sprites.t2) {
        return sprites.t2[action ? 'attack' : 'normal'][front ? 'front' : 'back']
    }
    return sprites.t1
}