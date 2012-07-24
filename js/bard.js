"use strict";

var Bard = Em.Application.create();

function addSkills(character) {
  // This will eventually be pulled from some api.
  var json = {
    'acrobatics': 'dex',
    'appraise': 'int',
    'bluff': 'cha',
    'climb': 'str',
    'craft': 'int',
    'diplomacy': 'cha',
    'disable device': 'dex',
    'disguise': 'cha',
    'escape artist': 'dex',
    'fly': 'dex',
    'handle animal': 'cha',
    'heal': 'wis',
    'intimidate': 'cha',
    'knowledge arcana': 'int',
    'knowledge dungeoneering': 'int',
    'knowledge geography': 'int',
    'knowledge history': 'int',
    'knowledge local': 'int',
    'knowledge nature': 'int',
    'knowledge nobility': 'int',
    'knowledge planes': 'int',
    'knowledge religion': 'int',
    'linguistics': 'int',
    'perception': 'wis',
    'perform': 'cha',
    'profession': 'wis',
    'ride': 'dex',
    'sense motive': 'wis',
    'sleight of hand': 'dex',
    'spellcraft': 'int',
    'stealth': 'dex',
    'survival': 'wis',
    'swim': 'str',
    'use magic device': 'cha',
  }
  var skills = character.get('skills');
  _.each(json, function(abil, skill) {
    var skill = Bard.store.createRecord(Bard.Skill, {
      name: skill,
      abil: abil,
      character: character,
    });
    skills.addObject(skill);
  });
}

$(function() {
  var character = Bard.store.createRecord(Bard.Character, {});
  addSkills(character);
  Bard.characterController = Ember.Object.create({
    character: character,
  });
});
