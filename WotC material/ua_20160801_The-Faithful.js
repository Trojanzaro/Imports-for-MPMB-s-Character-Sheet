var iFileName = "ua_20160801_The-Faithful.js";
RequiredSheetVersion(12.999);
// This file adds the content from the Unearthed Arcana: The Faithful article to MPMB's Character Record Sheet

// Define the source
SourceList["UA:TF"] = {
	name : "Unearthed Arcana: The Faithful",
	abbreviation : "UA:TF",
	group : "Unearthed Arcana",
	url : "http://media.wizards.com/2016/dnd/downloads/UA%20Non-Divine%20Faithful%20SFG.pdf",
	date : "2016/08/01"
};

// Adds 2 subclasses, 1 for the Warlock and 1 for the Wizard
AddSubClass("warlock", "the seeker", {
	regExpSearch : /^(?=.*warlock)(?=.*seeker).*$/i,
	subname : "the Seeker",
	source : ["UA:TF", 1],
	spellcastingExtra : ["feather fall", "jump", "levitate", "locate object", "clairvoyance", "sending", "arcane eye", "locate creature", "legend lore", "passwall"],
	features : {
		"subclassfeature1" : {
			name : "Shielding Aurora",
			source : ["UA:TF", 1],
			minlevel : 1,
			description : "\n   " + "As a bonus action, I create a whirling aurora of brilliant energy around me" + "\n   " + "It lasts until the end of my next turn and grants me resistance to all damage" + "\n   " + "Any hostile ending its turn in 10 ft of me get Warlock level + Cha mod radiant damage",
			usages : 1,
			recovery : "short rest",
			action : ["bonus action", ""]
		},
		"pact boon" : function () {
			var pactBoon = newObj(ClassList.warlock.features["pact boon"]);
			pactBoon.choices.push("Pact of the Star Chain");
			pactBoon["pact of the star chain"] = {
				name : "Pact of the Star Chain",
				source : ["UA:TF", 1],
				description : "\n   " + "My patron grants me an item of power which disappears when I die" + "\n   " + "While it is on my person, I can cast Augury as a ritual (PHB 215)" + "\n   " + "Additionally, once per short rest, I can get advantage on an Intelligence check" + "\n   " + "If I lose this item I can perform a 1-hour ceremony to get a replacement",
				usages : 1,
				recovery : "short rest",
				spellcastingBonus : {
					name : "Pact of the Star Chain",
					spells : ["augury"],
					selection : ["augury"],
					firstCol : "(R)"
				}
			};
			return pactBoon;
		}(),
		"subclassfeature6" : {
			name : "Astral Refuge",
			source : ["UA:TF", 2],
			minlevel : 6,
			description : "\n   " + "As an action, I can step into an astral refuge, coming back at the end of the turn" + "\n   " + "While in the astral refuge, I can take two actions to cast spells targeting just me",
			action : ["action", ""]
		},
		"subclassfeature10" : {
			name : "Far Wanderer",
			source : ["UA:TF", 2],
			minlevel : 10,
			description : "\n   " + "I no longer need to breathe, and I gain resistance to fire damage and cold damage",
			dmgres : ["Cold", "Fire"]
		},
		"subclassfeature14" : {
			name : "Astral Sequestration",
			source : ["UA:TF", 2],
			minlevel : 14,
			description : "\n   " + "With a 5 minutes ritual, I can shift myself and ten willing creatures to the Astral Plane" + "\n   " + "While sequestered an Astral Plane, we gain the full benefits of a short rest" + "\n   " + "After this rest, we return to the same space as before, without any time having passed",
			usages : 1,
			recovery : "long rest"
		}
	}
});
RunFunctionAtEnd(function() {
	var theTheurgySubclass = AddSubClass("wizard", "theurgy", {
		regExpSearch : /^((?=.*mystic)(?=.*theurge))|(?=.*(theurgy|theurgist)).*$/i,
		subname : "Theurgy",
		source : [["UA:TF", 1], ["UA:WR", 1]],
		fullname : "Theurgist",
		features : {
			"subclassfeature2" : {
				name : "Arcane Initiate",
				source : [["UA:TF", 2], ["UA:WR", 1]],
				minlevel : 2,
				description : "\n   " + "Choose a Cleric Domain using the \"Choose Feature\" button above" + "\n   " + "When I gain a wizard level I can replace one of the spells I would add to my spellbook" + "\n   " + "I can replace it with one of the chosen domain spells, if it is of a level I can cast" + "\n   " + "If my spellbook has all the domain spells, I can select any cleric spell of a level I can cast" + "\n   " + "Other wizards cannot copy cleric spells from my spellbook into their own spellbooks",
				choices : []
			},
			"subclassfeature2.1" : {
				name : "Channel Arcana",
				source : [["UA:TF", 2], ["UA:WR", 1]],
				minlevel : 2,
				description : "\n   " + "I can channel arcane energy from my deity; the save for this is my wizard spell DC",
				usages : [0, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3],
				recovery : "short rest"
			},
			"subclassfeature2.2" : {
				name : "Channel Arcana: Divine Arcana",
				source : [["UA:TF", 2], ["UA:WR", 1]],
				minlevel : 2,
				description : "\n   " + "As a bonus action, I speak a prayer to control the flow of magic around me" + "\n   " + "The next spell I cast gains a +2 bonus to its attack roll or saving throw DC",
				action : ["bonus action", ""]
			},
			"subclassfeature2.3" : {
				name : "Channel Arcana: Domain",
				source : [["UA:TF", 2], ["UA:WR", 1]],
				minlevel : 2,
				description : "\n   " + "Use the \"Choose Features\" button above to select the domain",
				choices : [],
				choicesNotInMenu : true,
				eval : "if (FeaChoice === \"\") {var CFrem = What(\"Class Features Remember\"); var tReg = /.*?wizard,subclassfeature2,(.*domain).*/i; if ((tReg).test(CFrem)) {FeaChoice = CFrem.replace(tReg, \"$1\"); AddString(\"Class Features Remember\", \"wizard,subclassfeature2.2,\" + FeaChoice, false);};};"
			},
			"subclassfeature6" : {
				name : "Arcane Acolyte",
				source : [["UA:TF", 3], ["UA:WR", 1]],
				minlevel : 6,
				description : "\n   " + "Use the \"Choose Features\" button above to select the domain",
				choices : [],
				choicesNotInMenu : true,
				eval : "if (FeaChoice === \"\") {var CFrem = What(\"Class Features Remember\"); var tReg = /.*?wizard,subclassfeature2,(.*?domain).*/i; if ((tReg).test(CFrem)) {FeaChoice = CFrem.replace(tReg, \"$1\"); AddString(\"Class Features Remember\", \"wizard,subclassfeature6,\" + FeaChoice, false);};};"
			},
			"subclassfeature10" : {
				name : "Arcane Priest",
				source : [["UA:TF", 3], ["UA:WR", 2]],
				minlevel : 10,
				description : "\n   " + "Use the \"Choose Features\" button above to select the domain",
				choices : [],
				choicesNotInMenu : true,
				eval : "if (FeaChoice === \"\") {var CFrem = What(\"Class Features Remember\"); var tReg = /.*?wizard,subclassfeature2,(.*?domain).*/i; if ((tReg).test(CFrem)) {FeaChoice = CFrem.replace(tReg, \"$1\"); AddString(\"Class Features Remember\", \"wizard,subclassfeature10,\" + FeaChoice, false);};};"
			},
			"subclassfeature14" : {
				name : "Arcane High Priest",
				source : [["UA:TF", 3], ["UA:WR", 2]],
				minlevel : 14,
				description : "\n   " + "Use the \"Choose Features\" button above to select the domain",
				choices : [],
				choicesNotInMenu : true,
				eval : "if (FeaChoice === \"\") {var CFrem = What(\"Class Features Remember\"); var tReg = /.*?wizard,subclassfeature2,(.*?domain).*/i; if ((tReg).test(CFrem)) {FeaChoice = CFrem.replace(tReg, \"$1\"); AddString(\"Class Features Remember\", \"wizard,subclassfeature14,\" + FeaChoice, false);};};"
			}
		}
	});
	var MTfeat = ClassSubList[theTheurgySubclass].features;
	for (var i = 0; i < ClassList.cleric.subclasses[1].length; i++) {
		var aDomain = ClassSubList[ClassList.cleric.subclasses[1][i]];
		if (!aDomain) continue;
		var dSource = parseSource(aDomain.source);
		if (!dSource) dSource = parseSource(aDomain.features["subclassfeature1"].source);
		if (!dSource) dSource = [["UA:MC", 8]];
		
		var suffix = 1;
		var entryDoNm = aDomain.subname;
		while (MTfeat["subclassfeature2"].choices.indexOf(entryDoNm) !== -1) {
			suffix += 1;
			entryDoNm = aDomain.subname + " (" + suffix + ")";
		};
		MTfeat["subclassfeature2"].choices.push(entryDoNm);
		MTfeat["subclassfeature2"][entryDoNm.toLowerCase()] = {
			name : "Arcane Initiate: " + aDomain.subname,
			source : dSource,
			spellcastingExtra : aDomain.spellcastingExtra,
			description : "\n   " + "When I gain a wizard level I can replace one of the spells I would add to my spellbook" + "\n   " + "I can replace it with one of the " + aDomain.subname.toLowerCase() + " spells, if it is of a level I can cast" + "\n   " + "If my spellbook has all the domain spells, I can select any cleric spell of a level I can cast" + "\n   " + "Other wizards cannot copy cleric spells from my spellbook into their own spellbooks",
			eval : ""
		};
		var AIdomain = MTfeat["subclassfeature2"][entryDoNm.toLowerCase()];
		for (var aFea in aDomain.features) {
			var dFea = aDomain.features[aFea];
			if (dFea.minlevel === 2 && (/channel divinity/i).test(dFea.name)) {
				MTfeat["subclassfeature2.3"].choices.push(entryDoNm);
				MTfeat["subclassfeature2.3"][entryDoNm.toLowerCase()] = eval(dFea.toSource());
				MTfeat["subclassfeature2.3"][entryDoNm.toLowerCase()].name = MTfeat["subclassfeature2.3"][entryDoNm.toLowerCase()].name.replace(/channel divinity/i, "Channel Arcana");
				AIdomain.eval += "var ToAdd = ['wizard', 'subclassfeature2.3', \"" + entryDoNm.toLowerCase() + "\"]; if (classes.known.wizard.level >= 2 && this.getField('Class Features Remember').value.indexOf(ToAdd.toString()) === -1) {ClassFeatureOptions(ToAdd)}; ";
			};
			if (dFea.minlevel === 1 && !dFea.armor && !dFea.weapons) {
				if (MTfeat["subclassfeature6"].choices.indexOf(entryDoNm) === -1) { //if the entry does not exist yet
					MTfeat["subclassfeature6"].choices.push(entryDoNm);
					MTfeat["subclassfeature6"][entryDoNm.toLowerCase()] = eval(dFea.toSource());
					AIdomain.eval += "var ToAdd = ['wizard', 'subclassfeature6', \"" + entryDoNm.toLowerCase() + "\"]; if (classes.known.wizard.level >= 6 && this.getField('Class Features Remember').value.indexOf(ToAdd.toString()) === -1) {ClassFeatureOptions(ToAdd)}; ";
				} else { //add to the existing entry
					var theFea = MTfeat["subclassfeature6"][entryDoNm.toLowerCase()];
					theFea.name += " \u0026 " + dFea.name;
					theFea.description += dFea.description;
					for (var subFea in dFea) {
						if (theFea[subFea] === undefined) theFea[subFea] = dFea[subFea];
					};
				};
			};
			if (dFea.minlevel === 6 && !dFea.armor && !dFea.weapons) {
				if (MTfeat["subclassfeature10"].choices.indexOf(entryDoNm) === -1) { //if the entry does not exist yet
					MTfeat["subclassfeature10"].choices.push(entryDoNm);
					MTfeat["subclassfeature10"][entryDoNm.toLowerCase()] = eval(dFea.toSource());
					AIdomain.eval += "var ToAdd = ['wizard', 'subclassfeature10', \"" + entryDoNm.toLowerCase() + "\"]; if (classes.known.wizard.level >= 10 && this.getField('Class Features Remember').value.indexOf(ToAdd.toString()) === -1) {ClassFeatureOptions(ToAdd)}; ";
				} else { //add to the existing entry
					var theFea = MTfeat["subclassfeature10"][entryDoNm.toLowerCase()];
					theFea.name += " \u0026 " + dFea.name;
					theFea.description += dFea.description;
					for (var subFea in dFea) {
						if (theFea[subFea] === undefined) theFea[subFea] = dFea[subFea];
					};
				};
			};
			if (dFea.minlevel === 17 && !dFea.armor && !dFea.weapons) {
				if (MTfeat["subclassfeature14"].choices.indexOf(entryDoNm) === -1) { //if the entry does not exist yet
					MTfeat["subclassfeature14"].choices.push(entryDoNm);
					MTfeat["subclassfeature14"][entryDoNm.toLowerCase()] = eval(dFea.toSource());
					AIdomain.eval += "var ToAdd = ['wizard', 'subclassfeature14', \"" + entryDoNm.toLowerCase() + "\"]; if (classes.known.wizard.level >= 14 && this.getField('Class Features Remember').value.indexOf(ToAdd.toString()) === -1) {ClassFeatureOptions(ToAdd)}; ";
				} else { //add to the existing entry
					var theFea = MTfeat["subclassfeature14"][entryDoNm.toLowerCase()];
					theFea.name += " \u0026 " + dFea.name;
					theFea.description += dFea.description;
					for (var subFea in dFea) {
						if (theFea[subFea] === undefined) theFea[subFea] = dFea[subFea];
					};
				};
			};
		};
	};
});
