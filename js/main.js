/******************************************\
 * @file
 * A JavaScript file for the theme.
\******************************************/

import * as anchorScrollAnimation  from './misc/anchorScrollAnimation';
import * as buggyfill              from './misc/buggyfill';
import * as fastclick              from './misc/fastclick';
import * as headroom               from './misc/headroom';
import * as magnificMessages       from './misc/magnificMessages';
import * as responsiveMenu         from './misc/responsiveMenu';
import "babel-polyfill"; // https://babeljs.io/docs/usage/polyfill/

anchorScrollAnimation.init();
buggyfill.init();
fastclick.init();
headroom.init();
magnificMessages.init();
responsiveMenu.init();
