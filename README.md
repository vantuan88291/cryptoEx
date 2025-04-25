
## Getting Started

Demo:

https://github.com/user-attachments/assets/ece15661-fa0f-4323-b0e1-05c84cbfcc46


```bash
yarn install
yarn start
```

To make things work on your local simulator, or on your phone, you need first to [run `eas build`](https://github.com/infinitered/ignite/blob/master/docs/expo/EAS.md). We have many shortcuts on `package.json` to make it easier:

```bash
yarn build:ios:sim # build for ios simulator
yarn build:ios:dev # build for ios device
yarn build:ios:prod # build for ios device
```

## Project Structure

The project follows a well-organized structure to maintain code clarity and separation of concerns:

```tree
project-root
├── app/                      # Main application code
│   ├── components/          # Reusable UI components
│   ├── screens/            # Screen components
│   ├── navigators/         # Navigation configuration
│   ├── models/            # Data models and state management
│   ├── services/          # API and external service integrations
│   ├── theme/             # App-wide styling themes
│   ├── utils/             # Utility functions and helpers
│   ├── i18n/             # Internationalization
│   └── config/            # App configuration files
├── assets/                 # Static assets (images, icons)
├── types/                 # TypeScript type definitions
├── test/                  # Test files
└── plugins/               # Project plugins and extensions

### Key Directories Explained

**`app/` Directory**
- `components/`: Reusable UI components that can be shared across different screens
- `screens/`: Individual screen components that represent full pages in the app
- `navigators/`: Navigation setup and routing configuration
- `models/`: Data models, state management, and business logic
- `services/`: API integrations, external service calls, and data fetching logic
- `theme/`: Global styling themes, colors, typography, and design tokens
- `utils/`: Helper functions, utilities, and common logic
- `i18n/`: Internationalization files for multiple language support
- `config/`: Application configuration files and constants

**`types/` Directory**
Contains TypeScript type definitions and interfaces used throughout the application.

**`test/` Directory**
Houses all test-related files including unit tests, integration tests, and test utilities.

**`plugins/` Directory**
Contains project plugins and extensions that enhance the development workflow.

### `./assets` directory

This directory is designed to organize and store various assets, making it easy for you to manage and use them in your application. The assets are further categorized into subdirectories, including `icons` and `images`:

```tree
assets
├── icons
└── images
```

**icons**
This is where your icon assets will live. These icons can be used for buttons, navigation elements, or any other UI components. The recommended format for icons is PNG, but other formats can be used as well.

Ignite comes with a built-in `Icon` component. You can find detailed usage instructions in the [docs](https://github.com/infinitered/ignite/blob/master/docs/boilerplate/app/components/Icon.md).

**images**
This is where your images will live, such as background images, logos, or any other graphics. You can use various formats such as PNG, JPEG, or GIF for your images.

Another valuable built-in component within Ignite is the `AutoImage` component. You can find detailed usage instructions in the [docs](https://github.com/infinitered/ignite/blob/master/docs/Components-AutoImage.md).

How to use your `icon` or `image` assets:

```typescript
import { Image } from 'react-native';

const MyComponent = () => {
  return (
    <Image source={require('../assets/images/my_image.png')} />
  );
};
```
