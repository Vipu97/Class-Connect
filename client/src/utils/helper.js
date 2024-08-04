import mcq from "../assets/svgs/mcq.svg";
import poll from "../assets/svgs/poll.svg";
import open from "../assets/svgs/open.svg";
import sorting from "../assets/svgs/sorting.svg";
import slide from "../assets/svgs/slide.svg";

export const trimSnackBarText = (text = "") => {
    const maxLength = 52;
  
    return text.length > maxLength ? `${text.substr(0, maxLength - 5)}...` : text;
  };
  
  export const nameTructed = (name, tructedLength) => {
    if (name?.length > tructedLength) {
      if (tructedLength === 15) {
        return `${name.substr(0, 12)}...`;
      } else {
        return `${name.substr(0, tructedLength)}...`;
      }
    } else {
      return name;
    }
  };
  
  export const json_verify = (s) => {
    try {
      JSON.parse(s);
      return true;
    } catch (e) {
      return false;
    }
  };
  
  export function formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;
    var strTime = hours + ":" + minutes + " " + ampm;
    return strTime;
  }
  

  export function createIconsMap(){
    const stringToIconMap = new Map();
    stringToIconMap.set("mcq",mcq);
    stringToIconMap.set("poll",poll);
    stringToIconMap.set("open",open);
    stringToIconMap.set("sorting",sorting);
    stringToIconMap.set("slide",slide)
    return stringToIconMap;
  }