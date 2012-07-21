"use strict";

var Bard = Em.Application.create();

Bard.characterController = Ember.Object.create({
  str: 10,
  dex: 10,
  con: 10,
  int: 10,
  wis: 10,
  cha: 10,

  fort_base: 0,
  refl_base: 0,
  will_base: 0,

  fort_abilBinding: 'con_mod',
  refl_abilBinding: 'dex_mod',
  will_abilBinding: 'wis_mod',

  str_mod: function() {
    return Math.floor((this.get('str') - 10) / 2);
  }.property('str'),
  dex_mod: function() {
    return Math.floor((this.get('dex') - 10) / 2);
  }.property('dex'),
  con_mod: function() {
    return Math.floor((this.get('con') - 10) / 2);
  }.property('con'),
  int_mod: function() {
    return Math.floor((this.get('int') - 10) / 2);
  }.property('int'),
  wis_mod: function() {
    return Math.floor((this.get('wis') - 10) / 2);
  }.property('wis'),
  cha_mod: function() {
    return Math.floor((this.get('cha') - 10) / 2);
  }.property('cha'),

  fort: function() {
    return parseInt(this.get('fort_base')) + parseInt(this.get('fort_abil'));
  }.property('fort_base', 'fort_abil'),
  refl: function() {
    return parseInt(this.get('refl_base')) + parseInt(this.get('refl_abil'));
  }.property('refl_base', 'refl_abil'),
  will: function() {
    return parseInt(this.get('will_base')) + parseInt(this.get('will_abil'));
  }.property('will_base', 'will_abil'),
});
