'use strict';
const Generator = require('yeoman-generator');
const includes = require('lodash.includes');
const path = require('path');
const plBase = ('./components');
const yaml = require('js-yaml');
const fs = require('fs');

module.exports = class extends Generator{
  constructor(args, opts) {
    // Calling the super constructor is important so our generator is correctly set up
    super(args, opts);
  }

  prompting() {

    console.log('Hi! This will help you build a component folder with assets.');
    console.log('Templates for this are in: ' + path.relative(process.cwd(), __dirname));
    console.log('');

    var prompts = [{
      type: 'list',
      name: 'patternType',
      message: 'Where would you like this new component?',
      choices: fs.readdirSync(plBase, 'utf8')
        .filter(x => x !== '.DS_Store')
    }, {
      type: 'list',
      name: 'patternSubType',
      message: 'Where in here?',
      choices: function(answers) {
        var folder = path.join(plBase, answers.patternType);
        var subfolders = fs.readdirSync(folder, 'utf8')
          .filter(x => x !== '.DS_Store')
          .filter(x => x !== '.gitkeep');
        return ['./'].concat(subfolders);
      }
    }, {
      type: 'checkbox',
      name: 'files',
      message: 'What files would you like in there?',
      choices: [
        'twig',
        'scss',
        'config.yml',
        'config.js',
        'js'
      ],
      default: [
        'twig',
        'scss',
        'config.yml',
      ]
    }, {
      name: 'name',
      message: 'What shall we name it?',
      filter: function(answer) {
        return answer.replace(/ /g, '-').toLowerCase();
      }
    }];

    return this.prompt(prompts).then(function (props) {
      // To access props later use this.props.someAnswer;
      props.dashlessName = props.name.replace(/-/g, '');
      this.props = props;
    }.bind(this));
  }

  writing() {
    // console.log(this.props);
    var destPath = path.join(plBase, this.props.patternType, this.props.patternSubType, this.props.name);

    if (includes(this.props.files, 'scss')) {
      this.fs.copyTpl(
        this.templatePath('_pattern.scss'),
        this.destinationPath(path.join(destPath, '_' + this.props.name + '.scss')),
        this.props
      );
    }

    if (includes(this.props.files, 'twig')) {
      this.fs.copyTpl(
        this.templatePath('pattern.twig'),
        this.destinationPath(path.join(destPath, this.props.name + '.twig')),
        this.props
      );
    }

    if (includes(this.props.files, 'config.yml')) {
      this.fs.copyTpl(
        this.templatePath('pattern.config.yml'),
        this.destinationPath(path.join(destPath, this.props.name + '.config.yml')),
        this.props
      );
    }

    if (includes(this.props.files, 'config.js')) {
      this.fs.copyTpl(
        this.templatePath('pattern.config.js'),
        this.destinationPath(path.join(destPath, this.props.name + '.config.js')),
        this.props
      );
    }

    if (includes(this.props.files, 'js')) {
      this.fs.copyTpl(
        this.templatePath('pattern.js'),
        this.destinationPath(path.join(destPath, this.props.name + '.js')),
        this.props
      );
    }
  }
};
