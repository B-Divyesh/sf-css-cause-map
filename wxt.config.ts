import { defineConfig } from 'wxt';

export default defineConfig({
  srcDir: '.',
  manifest: {
    name: 'CSS Cause Map',
    short_name: 'Cause Map',
    description: 'Trace the CSS rules and ancestor constraints most likely shaping a live element.',
    version: '1.0.1',
    minimum_chrome_version: '116',
    permissions: ['activeTab', 'scripting', 'storage', 'sidePanel'],
    action: {
      default_title: 'Open CSS Cause Map'
    },
    side_panel: {
      default_path: 'sidepanel.html'
    },
    icons: {
      '16': 'icon/16.png',
      '32': 'icon/32.png',
      '48': 'icon/48.png',
      '128': 'icon/128.png'
    }
  }
});
