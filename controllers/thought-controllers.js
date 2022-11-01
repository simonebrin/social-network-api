const { Thought, User } = require('../models');

const thoughtController = {
  getAllThoughts(req, res) {
        Thought.find({})
      .select("-__v")
      .then((dbThoughtData) => res.json(dbThoughtData))
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  getThoughtById({ params }, res) {
      Thought.findOne({ _id: params.thoughtId })
      .select("-__v")
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.status(404).send({ message: "There is no thought with that ID" });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => {
        console.log(err);
        res.staus(404).json(err);
      });
  },

//   createThought({ body }, res) {
//     Thought.create(body)
//       .then((dbThoughtData) => res.json(dbThoughtData))
//       .catch((err) => res.json(err));
//   },


  updateThought({ params, body }, res) {
    Thought.findOneAndUpdate({ _id: params.thoughtId }, body, {
      new: true,
    })
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.status(404).json({ message: "No thought found" });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => res.json(err));
  },

  deleteThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.thoughtId })
      .then((dbThoughtData) => res.json(dbThoughtData))
      .catch((err) => res.json(err));
  },

  addReaction({ body }, res) {
    Thought.findOneAndUpdate(
      { _id: body.thoughtId },
      { $addToSet: { reaction: body } },
      { new: true, runValidators: true }
    )
      .then((dbThoughtData) => {
        console.log(dbThoughtData);
        if (!dbThoughtData) {
          res.status(404).json({ message: "No thought found" });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => res.json(err));
  },

  deleteReaction({ params }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
        { $pull: { reaction: { reactionId: body.reactionId } } },
      { new: true },
    )
      .then((dbThoughtData) => res.json(dbThoughtData))
      .catch((err) => res.json(err));
  },

      createThought({ body }, res) {
          Thought.create(body)
              .then(dbThoughtData => {
                  User.findOneAndUpdate(
                      { _id: body.userId },
                      { $push: { thoughts: dbThoughtData._id } },
                      { new: true }
                  )
                      .then(dbUserData => {
                          console.log(dbUserData);
                          if (!dbUserData) {
                              res.status(404).json({ message: 'No user found' });
                              return;
                          }
                          res.json(dbUserData);
                      })
                      .catch(err => res.json(err));
              }
  )}
};

module.exports = thoughtController;