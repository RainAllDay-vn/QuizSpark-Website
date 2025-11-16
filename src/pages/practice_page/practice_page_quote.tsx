export interface EncouragementMessage {
  message: string;
  imageUrl?: string;
}


export interface ResultInfo {
  message: string;
  imageUrl?: string;
  resultReportQuote?: string;
}






export const correctMessages: EncouragementMessage[] = [
  {
    message: "Finally… I guess you can do something right",
    imageUrl: "https://i.imgflip.com/1g8my4.jpg" // Success Kid
  },
  {
    message: "Hmm… okay, I am mildly impressed",
    imageUrl: "https://i.imgflip.com/1hgej5.jpg" // Surprised Pikachu
  },
  {
    message: "I see… you didn’t completely ruin it this time",
    imageUrl: "https://i.imgflip.com/265rs.jpg" // Joseph Ducreux / Archaic Rap
  },
  {
    message: "Better than nothing I suppose",
    imageUrl: "https://i.imgflip.com/1n64mf.jpg" // Roll Safe Think About It
  },
  {
    message: "I expected more… but this will do",
    imageUrl: "https://i.imgflip.com/3zlro.jpg" // Meh cat
  }
];

export const wrongMessages: EncouragementMessage[] = [
  {
    message: "Again? Really? What are you doing",
    imageUrl: "https://i.imgflip.com/2v1a0v.jpg" // Angry Tom (Tom and Jerry)
  },
  {
    message: "Are you even trying? Disappointing",
    imageUrl: "https://i.imgflip.com/1yzkxd.jpg" // Disappointed Cricket Fan
  },
  {
    message: "No… just no. Study more!",
    imageUrl: "https://i.imgflip.com/1lrto.jpg" // Grumpy Cat
  },
  {
    message: "I worked hard for this… and you failed",
    imageUrl: "https://i.imgflip.com/2s4sgi.jpg" // Sad Pablo Escobar
  },
 {
    message: "This is unacceptable. TRY AGAIN!",
    imageUrl: "https://i.imgflip.com/2gnjn.jpg" // Gordon Ramsay "What are you?"
  }
];

export const scoreResults: { minAccuracy: number; info: ResultInfo }[] = [
  {
    minAccuracy: 100,
    info: {
      message: "Perfect Score! I am impressed… but not surprised",
      imageUrl: "https://i.imgflip.com/5c7lwq.jpg" // Gigachad
    }
  },
  {
    minAccuracy: 80,
    info: {
      message: "Good job! You’re somewhat competent",
      imageUrl: "https://i.imgflip.com/1k2ecg.jpg" // Obama Medal
    }
  },
  {
    minAccuracy: 50,
    info: {
      message: "Not terrible… but don’t get lazy",
      imageUrl: "https://i.imgflip.com/1p6xba.jpg" // Salt Bae
    }
  },
  {
    minAccuracy: 0,
    info: {
      message: "How are you doing, son?",
      imageUrl: "https://i.imgflip.com/1wz5o7.jpg" // Confused Nick Young
    }
  }
];

export function getEncouragementMessage(isCorrect: boolean): EncouragementMessage {
  if (isCorrect) {
    return correctMessages[Math.floor(Math.random() * correctMessages.length)];
  } else {
    return wrongMessages[Math.floor(Math.random() * wrongMessages.length)];
  }
}

