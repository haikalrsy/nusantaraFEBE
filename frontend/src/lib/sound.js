// Sound engine nonaktif sesuai preferensi pengguna
class SoundFXEngine {
  playHover() {}
  playSelect() {}
  playChime() {}
  speak() {}
  stopVoice() {}
  toggleMute() { return true }
}

export const soundFX = new SoundFXEngine()
