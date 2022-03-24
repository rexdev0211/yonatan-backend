const Comment = require('../models/Comment');
const { CONTENT_NOT_FOUND } = require('../errorCodes');
const { LogicError } = require('../errors');


async function createPublicDataWithCountComments({data, user, withoutSource}) {
  const ids = data.map(x => x.id);

  const comments = await Comment.find({contentId: {$in: ids}});

  data.forEach(x => {
    const count = comments.filter(y => y.contentId.toString() === x.id).length;
    x.countComments = count;
  });

  return data.map(x => {
    const isLiked = user ? x.likes.includes(user.id) : false;
    if (withoutSource) return { ...x.unactiveSubscriptionsPublicData, isLiked, countComments: x.countComments };
    return { ...x.publicData, isLiked, countComments: x.countComments };
  });
}

async function handleLike({model, contentId, user, operation }) {
  const content = await model.findByIdAndUpdate(
    contentId,
    operation === 'like' ? { $addToSet: { likes: user.id } } : { $pull: { likes: user.id } }, { new: true });

  if (!content) throw new LogicError(CONTENT_NOT_FOUND);

  const isLiked = content.likes.includes(user.id);

  return {...content.publicData, isLiked};
}

module.exports = { createPublicDataWithCountComments, handleLike };