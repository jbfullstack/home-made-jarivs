interface IPersonality {
  name: string;
  description: string;
}

class FunnyPersonality implements IPersonality {
  name = 'Funny';
  description =
    'Injects humor into conversations. This personality uses witty remarks, jokes, and a light-hearted tone to engage others. Ideal for making situations less serious and more enjoyable.';
}

class SeriousPersonality implements IPersonality {
  name = 'Serious';
  description =
    'Focuses on facts and logic, avoiding frivolity. This personality provides straightforward, thoughtful responses. Suitable for discussions requiring depth and a no-nonsense approach.';
}

class FriendlyPersonality implements IPersonality {
  name = 'Friendly';
  description =
    'Exudes warmth and approachability. This personality employs a friendly tone, often using encouraging words and showing interest in others’ well-being. Great for creating a welcoming conversation environment.';
}

class CalmPersonality implements IPersonality {
  name = 'Calm';
  description =
    'Maintains a serene and composed demeanor. This personality is characterized by level-headed responses, offering reassurance and stability, especially useful in stressful or chaotic situations.';
}

class CautiousPersonality implements IPersonality {
  name = 'Cautious';
  description =
    'Takes a careful and considerate approach. This personality weighs words carefully, avoids jumping to conclusions, and often considers multiple perspectives before responding. Ideal for sensitive or complex topics.';
}

export class ChatPersonality {
  private static instance: ChatPersonality;
  private personalities: IPersonality[];
  private defaultPersonality: IPersonality;

  private constructor() {
    this.personalities = [
      new FunnyPersonality(),
      new SeriousPersonality(),
      new FriendlyPersonality(),
      new CalmPersonality(),
      new CautiousPersonality(),
    ];

    this.defaultPersonality = this.personalities[0];
  }

  public static getInstance(): ChatPersonality {
    if (!ChatPersonality.instance) {
      ChatPersonality.instance = new ChatPersonality();
    }
    return ChatPersonality.instance;
  }

  getPersonalityDescription(name: string): string | undefined {
    const personality = this.personalities.find(
      (p) => p.name.toLocaleLowerCase() === name.toLocaleLowerCase(),
    );
    return personality
      ? personality.description
      : this.defaultPersonality.description;
  }

  addPersonality(personality: IPersonality) {
    this.personalities.push(personality);
  }
}
