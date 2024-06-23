const { Recipe } = require('../models/Recipe');

async function getAll() {
    return Recipe.find().lean();

}

async function getRecent() {
    return Recipe.find().sort({ $natural: -1 }).limit(3).lean();
}

async function getById(id) {
    return Recipe.findById(id).lean();
}

async function searchRecipes(search) {
    const query = {};

    if (search) {
        query.title = new RegExp(search, 'i');
    }

    return Recipe.find(query).lean();
}



async function getByAuthorId(authorId) {
    return Recipe.find({ author: authorId }).lean();
};


async function create(data, authorId) {
    const record = new Recipe({
        title: data.title,
        ingredients: data.ingredients,
        instructions: data.instructions,
        image: data.image,
        description: data.description,
        author: authorId
    });

    await record.save();

    return record;
};

async function update(id, data, userId) {
    const record = await Recipe.findById(id);

    if (!record) {
        throw new ReferenceError('Record not found' + id);
    }

    if (record.author.toString() != userId) {
        throw new Error('Acess denied');
    }

        record.title = data.title,
        record.ingredients = data.ingredients,
        record.instructions = data.instructions,
        record.image = data.image,
        record.description = data.description,

        await record.save();

    return record;
};


async function reccomendRecipe(recipeId, userId) {
    const record = await Recipe.findById(recipeId);

    if (!record) {
        throw new ReferenceError('Record not found' + recipeId);
    }

    if (record.author.toString() == userId) {
        throw new Error('Acess denied');
        
    }

    if (record.reccomendList.find(v => v.toString() == userId)) {
        throw new Error('Only 1 reccomedation per user');
    }

    record.reccomendList.push(userId);

    await record.save();
    return record;
}


async function deleteById(id, userId) {
    const record = await Recipe.findById(id);

    if (!record) {
        throw new ReferenceError('Record not found' + id);
    }

    if (record.author.toString() != userId) {
        throw new Error('Acess denied');
    }

    await Recipe.findByIdAndDelete(id);
}


module.exports = {
    getAll,
    getRecent,
    getById,
    create,
    update,
    deleteById,
    reccomendRecipe,
    getByAuthorId,
    searchRecipes
};
