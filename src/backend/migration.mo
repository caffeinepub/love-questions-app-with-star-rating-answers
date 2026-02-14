import Map "mo:core/Map";
import Text "mo:core/Text";
import Iter "mo:core/Iter";

module {
  type OldAnswer = {
    questionId : Text;
    rating : Nat;
    timestamp : Int;
  };

  type OldActor = {
    answers : Map.Map<Text, OldAnswer>;
  };

  type NewAnswer = {
    questionId : Text;
    textAnswer : Text;
    timestamp : Int;
  };

  type NewActor = {
    answers : Map.Map<Text, NewAnswer>;
  };

  public func run(old : OldActor) : NewActor {
    let newAnswers = old.answers.map<Text, OldAnswer, NewAnswer>(
      func(_id, oldAnswer) {
        { oldAnswer with textAnswer = "" };
      }
    );
    { answers = newAnswers };
  };
};
