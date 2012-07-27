"use strict";

var Bard = Bard || Em.Application.create();

function addSkills(character) {
  $.ajax({
    url: 'http://bard.knowledge.prismaticgreen.com:4567/skills/all',
    dataType: 'json',

    success: function(data) {
      var skills = character.get('skills');
      _.each(data, function(json_skill, i) {
        var skill = Bard.store.createRecord(Bard.Skill, {
          name: json_skill.display_name,
          abil: json_skill.stat,
          trained_only: json_skill.trained,
          check_penalty: json_skill.check_penalty,
          character: character,
        });
        skills.addObject(skill);
      });
    },

    error: function(data) {
      console.log('Something has gone horribly wrong.');
    }
  })
}

$(function() {
  var character = Bard.store.createRecord(Bard.Character, {});
  addSkills(character);
  Bard.characterController = Ember.Object.create({
    character: character,
  });
});
