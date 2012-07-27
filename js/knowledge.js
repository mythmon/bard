"use strict";

var Bard = Bard || Em.Application.create();

Bard.Knowledge = Em.Object.create({

  _classes: {},

  classes: function() {
    if (this.get('_classes').content === undefined) {
      this.get('_classes').content = [
        "wizard", "monk", "bard", "druid", "rogue", "cleric", "ranger",
        "sorcerer", "paladin", "barbarian", "fighter"
      ];
    }
    return this.get('_classes');
  }.property('_classes'),
});
