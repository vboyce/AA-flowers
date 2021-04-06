import Empirica from "meteor/empirica:core";

export const targetSets = {
  'blockA_set1' : {
    "A": {'name':"/experiment/yellow_similar/image_01220.jpg", 'utility': 6, 'utility_image': "/experiment/prop_bars/10.png"},
    "B": {'name':"/experiment/yellow_similar/image_06298.jpg", 'utility': 4, 'utility_image': "/experiment/prop_bars/5.png"},
    "C": {'name':"/experiment/yellow_similar/image_06354.jpg", 'utility': 2, 'utility_image': "/experiment/prop_bars/9.png"},
    "D": {'name':"/experiment/yellow_similar/image_06676.jpg", 'utility': 1, 'utility_image': "/experiment/prop_bars/1.png"}
  },
  'blockA_set2' : {
    "A": {'name':"/experiment/yellow_similar/image_01220.jpg", 'utility': 6},
    "B": {'name':"/experiment/yellow_similar/image_05700.jpg", 'utility': 3},
    "C": {'name':"/experiment/yellow_similar/image_06298.jpg", 'utility': 4},
    "D": {'name':"/experiment/yellow_similar/image_06354.jpg", 'utility': 2}
  },
  'blockA_set3' : {
    "A": {'name':"/experiment/yellow_similar/image_04982.jpg", 'utility': 8},
    "B": {'name':"/experiment/yellow_similar/image_01220.jpg", 'utility': 6},
    "C": {'name':"/experiment/yellow_similar/image_02295.jpg", 'utility': 12},
    "D": {'name':"/experiment/yellow_similar/image_06354.jpg", 'utility': 2},
  },
  'setA' : {
    "A": {'name':"/experiment/tangram_A.png", 'utility': 10, 'utility_image': "/experiment/prop_bars/10.png"},
    "B":{'name': "/experiment/tangram_B.png", 'utility': 5,  'utility_image': "/experiment/prop_bars/5.png"},
    "C": {'name':"/experiment/tangram_C.png", 'utility': 9,  'utility_image': "/experiment/prop_bars/9.png"},
    "D":{'name':"/experiment/tangram_D.png", 'utility': 1,  'utility_image': "/experiment/prop_bars/1.png"}
  }
};

export const names = [
    "Repi",
    "Minu",
    "Laju",
    "Hera",
    "Zuda",
    "Bavi",
    "Lika",
    "Felu",
    "Wepi",
    "Dace",
  ]; // for the players names to match avatar color

export const avatarNames = [
    "Samuel",
    "Alaina",
    "Katherine",
    "Riley",
    "Mason",
    "Kaylee",
    "Matthew",
    "Leah",
    "Ethan",
    "Gabriel",
  ]// to do more go to https://jdenticon.com/#icon-D3

export const nameColors = [
    "#8138A8",
    "#7ACC66",
    "#3D45B7",
    "#997E32",
    "#BD75D1",
    "#A83F38",
    "#2E808C",
    "#59C7B1",
    "#A8385F",
    "#996832"
  ] //these match the avatarNames colors -- need to code by hand with html color picker type thing

