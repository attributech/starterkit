/******************************************\
 * @file
 * A JavaScript file for the theme.
\******************************************/

import "@babel/polyfill";

import * as anchorScrollAnimation  from './misc/anchorScrollAnimation';
import * as buggyfill              from './misc/buggyfill';
import * as fastclick              from './misc/fastclick';
import * as headroom               from './misc/headroom';
import * as magnificMessages       from './misc/magnificMessages';
import * as lazySizes              from './misc/lazysizes';

import * as  navigation             from 'components/03-modules/navigation/navigation';
import * as svgpolyfill from './misc/svgpolyfill.js';

//anchorScrollAnimation.init();
//buggyfill.init();
headroom.init();
//magnificMessages.init();


Drupal.behaviors.starterkit = {
  attach: (context, settings) => {
    navigation.init(context, settings);
    lazySizes.aspectRatio.init(context, settings);
    svgpolyfill.init();
  }
};
