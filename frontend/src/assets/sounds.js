import { Howl } from 'howler'

export const playerJoin = new Howl({
  src: [require('@/assets/blip-1.mp3')]
})

export const playerLeave = new Howl({
  src: [require('@/assets/blip-2.mp3')]
})

export const ovation = new Howl({
  src: [require('@/assets/ovation.mp3')]
})

export const gameBegin = new Howl({
  src: [require('@/assets/store-chime.mp3')]
})

export const newResponse = new Howl({
  src: [require('@/assets/checkout.mp3')]
})