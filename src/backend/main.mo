import Map "mo:core/Map";
import Text "mo:core/Text";
import Iter "mo:core/Iter";
import Migration "migration";

(with migration = Migration.run)
actor {
  type Answer = {
    questionId : Text;
    textAnswer : Text;
    timestamp : Int;
  };

  let answers = Map.empty<Text, Answer>();

  public shared ({ caller }) func saveAnswer(id : Text, questionId : Text, textAnswer : Text, timestamp : Int) : async () {
    let answer : Answer = {
      questionId;
      textAnswer;
      timestamp;
    };
    answers.add(id, answer);
  };

  public query ({ caller }) func getAllAnswers() : async [Answer] {
    answers.values().toArray();
  };
};
