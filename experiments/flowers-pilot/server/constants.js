import Empirica from "meteor/empirica:core";

export const sequences = {
  "setA": ["purple", "red", "white", "yellow"]
}
export const targetSets = {
  "yellow":[
     {"label": "yellow_1", 'location':"/experiment/yellow_similar/image_01220.jpg"},
     {"label": "yellow_2", 'location':"/experiment/yellow_similar/image_01753.jpg"},
     {"label": "yellow_3", 'location':"/experiment/yellow_similar/image_02295.jpg"},
     {"label": "yellow_4", 'location':"/experiment/yellow_similar/image_03709.jpg"},
     {"label": "yellow_5", 'location':"/experiment/yellow_similar/image_04078.jpg"},
     {"label": "yellow_6", 'location':"/experiment/yellow_similar/image_04425.jpg"},
     {"label": "yellow_7", 'location':"/experiment/yellow_similar/image_04667.jpg"},
     {"label": "yellow_8", 'location':"/experiment/yellow_similar/image_04982.jpg"},
     {"label": "yellow_9", 'location':"/experiment/yellow_similar/image_05700.jpg"},
     {"label": "yellow_10", 'location':"/experiment/yellow_similar/image_06298.jpg"},
     {"label": "yellow_11", 'location':"/experiment/yellow_similar/image_06354.jpg"},
     {"label": "yellow_12", 'location':"/experiment/yellow_similar/image_06676.jpg"},

  ],
  "red":[
    {"label": "red_1", 'location':"/experiment/red_similar/image_00757.jpg"},
    {"label": "red_2", 'location':"/experiment/red_similar/image_01583.jpg"},
    {"label": "red_3", 'location':"/experiment/red_similar/image_01973.jpg"},
    {"label": "red_4", 'location':"/experiment/red_similar/image_02269.jpg"},
    {"label": "red_5", 'location':"/experiment/red_similar/image_02561.jpg"},
    {"label": "red_6", 'location':"/experiment/red_similar/image_03162.jpg"},
    {"label": "red_7", 'location':"/experiment/red_similar/image_04769.jpg"},
    {"label": "red_8", 'location':"/experiment/red_similar/image_06490.jpg"},
    {"label": "red_9", 'location':"/experiment/red_similar/image_06787.jpg"},
    {"label": "red_10", 'location':"/experiment/red_similar/image_06859.jpg"},
    {"label": "red_11", 'location':"/experiment/red_similar/image_07641.jpg"},
    {"label": "red_12", 'location':"/experiment/red_similar/image_07931.jpg"},

 ],
 "purple":[
  {"label": "purple_1", 'location':"/experiment/purple_similar/image_00450.jpg"},
  {"label": "purple_2", 'location':"/experiment/purple_similar/image_01664.jpg"},
  {"label": "purple_3", 'location':"/experiment/purple_similar/image_03085.jpg"},
  {"label": "purple_4", 'location':"/experiment/purple_similar/image_04133.jpg"},
  {"label": "purple_5", 'location':"/experiment/purple_similar/image_04335.jpg"},
  {"label": "purple_6", 'location':"/experiment/purple_similar/image_04700.jpg"},
  {"label": "purple_7", 'location':"/experiment/purple_similar/image_05355.jpg"},
  {"label": "purple_8", 'location':"/experiment/purple_similar/image_05639.jpg"},
  {"label": "purple_9", 'location':"/experiment/purple_similar/image_06714.jpg"},
  {"label": "purple_10", 'location':"/experiment/purple_similar/image_07320.jpg"},
  {"label": "purple_11", 'location':"/experiment/purple_similar/image_07517.jpg"},
  {"label": "purple_12", 'location':"/experiment/purple_similar/image_07752.jpg"},

],
"white":[
  {"label": "white_1", 'location':"/experiment/white_similar/image_00006.jpg"},
  {"label": "white_2", 'location':"/experiment/white_similar/image_01448.jpg"},
  {"label": "white_3", 'location':"/experiment/white_similar/image_03139.jpg"},
  {"label": "white_4", 'location':"/experiment/white_similar/image_03710.jpg"},
  {"label": "white_5", 'location':"/experiment/white_similar/image_04849.jpg"},
  {"label": "white_6", 'location':"/experiment/white_similar/image_05280.jpg"},
  {"label": "white_7", 'location':"/experiment/white_similar/image_05493.jpg"},
  {"label": "white_8", 'location':"/experiment/white_similar/image_05846.jpg"},
  {"label": "white_9", 'location':"/experiment/white_similar/image_06003.jpg"},
  {"label": "white_10", 'location':"/experiment/white_similar/image_07057.jpg"},
  {"label": "white_11", 'location':"/experiment/white_similar/image_07463.jpg"},
  {"label": "white_12", 'location':"/experiment/white_similar/image_08131.jpg"},

]


}

export const utilities = [
  {'utility': 1, 'utility_image': "/experiment/prop_bars/1.png"},
  {'utility': 2, 'utility_image': "/experiment/prop_bars/2.png"},
  {'utility': 3, 'utility_image': "/experiment/prop_bars/3.png"},
  {'utility': 4, 'utility_image': "/experiment/prop_bars/4.png"},
  {'utility': 5, 'utility_image': "/experiment/prop_bars/5.png"},
  {'utility': 6, 'utility_image': "/experiment/prop_bars/6.png"},
  {'utility': 7, 'utility_image': "/experiment/prop_bars/7.png"},
  {'utility': 8, 'utility_image': "/experiment/prop_bars/8.png"},
  {'utility': 9, 'utility_image': "/experiment/prop_bars/9.png"},
  {'utility': 10, 'utility_image': "/experiment/prop_bars/10.png"},
  {'utility': 11, 'utility_image': "/experiment/prop_bars/11.png"},
  {'utility': 12, 'utility_image': "/experiment/prop_bars/12.png"},
  

]
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

