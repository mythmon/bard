"use strict";

var Bard = Bard || Em.Application.create();

Bard.adapter = DS.Adapter;
Bard.store = DS.Store.create({
  revision: 4,
});

Bard.Character = DS.Model.extend({
  name: DS.attr('string'),
  player: DS.attr('string'),
  class: DS.attr('string'),

  str: DS.attr('number', {defaultValue: 10}),
  dex: DS.attr('number', {defaultValue: 10}),
  con: DS.attr('number', {defaultValue: 10}),
  int: DS.attr('number', {defaultValue: 10}),
  wis: DS.attr('number', {defaultValue: 10}),
  cha: DS.attr('number', {defaultValue: 10}),

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

  fort_base: DS.attr('number', {defaultValue: 0}),
  refl_base: DS.attr('number', {defaultValue: 0}),
  will_base: DS.attr('number', {defaultValue: 0}),

  fort: function() {
    return this.get('fort_base') + this.get('fort_abil');
  }.property('fort_base', 'fort_abil'),
  refl: function() {
    return this.get('refl_base') + this.get('refl_abil');
  }.property('refl_base', 'refl_abil'),
  will: function() {
    return this.get('will_base') + this.get('will_abil');
  }.property('will_base', 'will_abil'),

  fort_abil: function() {
    return this.get('con_mod');
  }.property('con_mod'),
  refl_abil: function() {
    return this.get('dex_mod');
  }.property('dex_mod'),
  will_abil: function() {
    return this.get('wis_mod');
  }.property('wis_mod'),

  skills: DS.hasMany('Bard.Skill'),
});

Bard.Skill = DS.Model.extend({
  name: DS.attr('string'),
  abil: DS.attr('string'),
  ranks: DS.attr('number', {defaultValue: 0}),
  in_class: DS.attr('boolean', {defaultValue: false}),

  total: function() {
    var t = parseInt(this.get('ranks'));
    if (t > 0 && this.get('in_class')) {
      t += 3;
    }
    t += this.get('abil_mod');
    _.each(this.get('misc_mods'), function(m) {
      t += m;
    });
    return t;
  }.property('abil_mod', 'ranks', 'in_class', 'misc_mods.@each'),

  abil_mod: function() {
    var path = 'character.%@1_mod'.fmt(this.get('abil'));
    return this.get(path);
  }.property('abil', 'character.str_mod', 'character.con_mod',
                     'character.dex_mod', 'character.int_mod',
                     'character.wis_mod', 'character.cha_mod'),

  misc_sum: function() {
    return _.sum(this.get('misc_mods'));
  }.property('misc_mods'),
});
