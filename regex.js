
module.exports = { 
    templates : {

    url  : [/(http?(s):\/\/[^\\'\"<>]+?\\.(jpg|jpeg|gif|png))/g],
    time : [/\d+\s*m[i]?[n]?[u]?[t]?[e]?[s]?/gi,/\d+\s*h[o]?[u]?[r]?[s]?/gi,/\d+\s*s[e]?[c]?[o]?[n]?[d]?[s]?/gi,/\d+\s*d[a]?[y]?[s]?/gi],
    discordID  : /\d{18}/gi
  
  } 
};
