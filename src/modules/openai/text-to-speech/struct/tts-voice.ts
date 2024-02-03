interface IVoice {
  name: string;
  description: string;
}

class OnyxVoice implements IVoice {
  name = 'onyx';
  description = `Onyx's voice is usually deep and resonant, often perceived as sophisticated. It works well for content requiring a sense of gravity or seriousness`;
}

class ShimmerVoice implements IVoice {
  name = 'shimmer';
  description = `Shimmer's voice is often soft and melodic, suitable for content that aims to be calming or requires a gentle, soothing approach`;
}

class AlloyVoice implements IVoice {
  name = 'alloy';
  description = `Alloy typically has a voice that is strong and confident, often perceived as masculine. It's well-suited for authoritative or professional content`;
}

class FableVoice implements IVoice {
  name = 'fable';
  description = `Fable often has a voice that is warm and soothing, making it suitable for storytelling or content that aims to be comforting or engaging in a gentle way`;
}

class NovaVoice implements IVoice {
  name = 'nova';
  description = `Nova typically has a clear, articulate voice, often described as energetic and upbeat. It's excellent for content that requires enthusiasm and a lively tone.`;
}

export class TTSVoice {
  private static instance: TTSVoice;
  private voices: IVoice[];
  private defaultVoice: IVoice;

  private constructor() {
    this.voices = [
      new OnyxVoice(),
      new ShimmerVoice(),
      new AlloyVoice(),
      new FableVoice(),
      new NovaVoice(),
    ];

    this.defaultVoice = this.voices[0];
  }

  public static getInstance(): TTSVoice {
    if (!TTSVoice.instance) {
      TTSVoice.instance = new TTSVoice();
    }
    return TTSVoice.instance;
  }

  getVoiceDescription(name: string): string | undefined {
    const personality = this.voices.find(
      (p) => p.name.toLocaleLowerCase() === name.toLocaleLowerCase(),
    );
    return personality
      ? personality.description
      : this.defaultVoice.description;
  }

  getVoiceName(name: string): string | undefined {
    const personality = this.voices.find(
      (p) => p.name.toLocaleLowerCase() === name.toLocaleLowerCase(),
    );
    return personality ? personality.name : this.defaultVoice.name;
  }

  addVoice(personality: IVoice) {
    this.voices.push(personality);
  }
}
