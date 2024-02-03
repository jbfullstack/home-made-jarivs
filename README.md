![Demo of Application](./demo/presentation-demo.gif)

## Description

Rest API that integrates with [ChatGPT](http://chat.openai.com) and [OpenAI](http://openai.com) models using [NestJS](https://nestjs.com/)

Home made Jarvis - for simulating conversations with a virtual character.
It's a platform designed for practice in diverse scenarios like interviews, exams, and casual chats, utilizing AI for response generation and voice synthesis.

## Installation

```bash
$ yarn
```

## Running the app

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```

## Testing the app

**Demo Folder Contents**
For convenient testing of the application, the demo folder includes essential tools:

- Insomnia Collection: This collection is ready to be imported into Insomnia, a popular API client. It contains pre-configured requests tailored for testing various functionalities of our application.

- Shell Script for Automated Testing: We have provided a shell script that utilizes curl to interact with the application. This script is designed to:
  - Automatically create a new session.
  - Initiate a conversation in two modes:
    - Written Conversation Mode: First, the script engages in a text-based conversation, demonstrating how the application processes and responds to written inputs.
    - Verbal Conversation Mode: Subsequently, it switches to a verbal interaction mode, showcasing the application's ability to handle and respond to voice-based inputs.

**How to Use**

- Insomnia:
  Importing the Insomnia Collection:

  - Open Insomnia.
  - Go to 'Import/Export' and choose 'Import Data'.
  - Select 'From File' and navigate to the demo folder.
  - Choose the provided Insomnia collection file to import (in demo folder).

- Shell script:
  Running the Shell Script
  - Ensure curl is installed on your system.
  - Navigate to the demo folder in your terminal or command prompt.
  - Run the script using ./script_name.sh (replace script_name.sh with the actual script filename).

**_This setup provides a quick and easy way to test and understand the capabilities of the application, both in written and verbal communication contexts._**

## Stay in touch

- Jérémy Brunel - [jbfullstack](https://github.com/jbfullstack)

## License

[MIT licensed](LICENSE).
