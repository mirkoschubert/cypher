import {ComponentRegistry, ExtensionRegistry, PreferencesUIStore} from 'nylas-exports';

import Config from './settings/config';
import MessageLoaderExtension from './message-loader/message-loader-extension';
import ComposerLoader from './composer/composer-loader';
import MessageLoaderHeader from './message-loader/message-loader-header';

module.exports = {
  config: {
    keybase: {
      type: 'object',
      properties: {
        username: {
          type: 'string',
          default: ''
        },
        uid: {
          type: 'string',
          default: ''
        },
        csrf_token: {
          type: 'string',
          default: ''
        },
        session_token: {
          type: 'string',
          default: ''
        }
      }
    }
  },

  // Activate is called when the package is loaded. If your package previously
  // saved state using `serialize` it is provided.
  //
  activate(state) {
    this.state = state;
    this.config = new Config();

    PreferencesUIStore.registerPreferencesTab(this.config);

    ExtensionRegistry.MessageView.register(MessageLoaderExtension);
    ComponentRegistry.register(ComposerLoader, { role: 'Composer:ActionButton' });
    ComponentRegistry.register(MessageLoaderHeader, { role: 'message:BodyHeader' });
  },

  // Serialize is called when your package is about to be unmounted.
  // You can return a state object that will be passed back to your package
  // when it is re-activated.
  //
  serialize() {
  },

  // This **optional** method is called when the window is shutting down,
  // or when your package is being updated or disabled. If your package is
  // watching any files, holding external resources, providing commands or
  // subscribing to events, release them here.
  //
  deactivate() {
    PreferencesUIStore.unregisterPreferencesTab(this.config.tabId);

    ExtensionRegistry.MessageView.unregister(MessageLoaderExtension);
    ComponentRegistry.unregister(ComposerLoader)
    ComponentRegistry.unregister(MessageLoaderHeader)
  }
}
