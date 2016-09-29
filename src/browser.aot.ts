import { platformBrowser } from '@angular/platform-browser';
import { enableProdMode } from '@angular/core';
import { bootloader } from '@angularclass/hmr';

import { MainModuleNgFactory } from 'ngfactory/src/main.browser.ngfactory';

enableProdMode();

export function main() {
  return platformBrowser().bootstrapModuleFactory(MainModuleNgFactory);
}

// boot on document ready
bootloader(main);
