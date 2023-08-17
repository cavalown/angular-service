import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { Cqrs } from './store/frontend';
import { AppModule } from './app/app.module';

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .then((appModule) => {
    // Ensure Angular destroys itself on hot reloads.
    /**
    if (window['ngRef']) {
      window['ngRef'].destroy();
    }
    window['ngRef'] = appModule;
  */

    // And this line for adoption
    Cqrs.setAppModule(appModule);
  })
  .catch((err) => console.error(err));
