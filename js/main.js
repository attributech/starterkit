/******************************************\
 * @file
 * A JavaScript file for the theme.
\******************************************/

import "babel-polyfill"; // https://babeljs.io/docs/usage/polyfill/

import * as anchorScrollAnimation  from './misc/anchorScrollAnimation';
import * as buggyfill              from './misc/buggyfill';
import * as fastclick              from './misc/fastclick';
import * as headroom               from './misc/headroom';
import * as magnificMessages       from './misc/magnificMessages';
import * as lazySizes              from './misc/lazysizes';

import * as navigation             from 'components/03-modules/navigation/navigation';


//anchorScrollAnimation.init();
//buggyfill.init();
headroom.init();
//magnificMessages.init();


Drupal.behaviors.leniadam = {
  attach: (context, settings) => {
    navigation.init(context, settings);
    lazySizes.aspectRatio.init(context, settings);
  }
};
