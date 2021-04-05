import Empirica from "meteor/empirica:core";

export const targetSets = {
  'setA' : [
    ["A", {'name':"/experiment/tangram_A.png", 'utility': 5}],
    ["B",{'name': "/experiment/tangram_B.png", 'utility': 3}],
    ["C", {'name':"/experiment/tangram_C.png", 'utility': 2}],
    ["D",{'name':"/experiment/tangram_D.png", 'utility': 1}]
  ]
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

