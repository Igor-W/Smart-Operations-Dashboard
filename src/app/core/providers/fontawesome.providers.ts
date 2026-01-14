import {
  EnvironmentProviders,
  importProvidersFrom,
  makeEnvironmentProviders,
  inject,
  provideEnvironmentInitializer,
} from '@angular/core';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faCartShopping,
  faStar as filledStar,
  faStarHalfStroke,
} from '@fortawesome/free-solid-svg-icons';
import { faHeart, faStar as unFilledStar } from '@fortawesome/free-regular-svg-icons';
const icons = [faCartShopping, filledStar, faStarHalfStroke, faHeart, unFilledStar];
export function provideFontAwesome(): EnvironmentProviders {
  return makeEnvironmentProviders([
    importProvidersFrom(FontAwesomeModule),
    provideEnvironmentInitializer(() => {
      const library = inject(FaIconLibrary);
      library.addIcons(...icons);
    }),
  ]);
}
