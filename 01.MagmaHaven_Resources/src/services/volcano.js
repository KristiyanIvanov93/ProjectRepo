const { Volcano } = require('../models/Volcano');

// todo repalce with real data service based on exam

async function getAll() {
    return Volcano.find().lean();

}

async function getRecent() {
    return Volcano.find().sort({ $natural: -1 }).limit(3).lean();
}

async function getById(id) {
    return Volcano.findById(id).lean();

}

async function searchVolcanoes(name, typeVolcano){
    const query = {};

    if(name){
        query.name = new RegExp(name, 'i'); // Case-insensitive search
    }

    if(typeVolcano && typeVolcano !== '---'){
query.typeVolcano = typeVolcano;
    }
    console.log('Query:', query); // Add debug log to check the query object

return Volcano.find(query).lean();

};

async function getByAuthorId(authorId){
return Volcano.find({author: authorId}).lean();
};

async function create(data, authorId) {
    // todo extract properties from view model
    const record = new Volcano({
        name: data.name,
        location: data.location,
        elevation: data.elevation,
        lastErruption: data.lastErruption,
        image: data.image,
        typeVolcano: data.typeVolcano,
        description: data.description,
        author: authorId


    });

    await record.save();

    return record;
};

async function update(id, data, userId) {
    const record = await Volcano.findById(id);

    if (!record) {
        throw new ReferenceError('Record not found' + id);

    }

    if (record.author.toString() != userId) {
        throw new Error('Acess denied');

    }

    //todo replace with real properties
    record.name = data.name;
    record.location = data.location;
    record.elevation = data.elevation;
    record.lastErruption = data.lastErruption;
    record.image = data.image;
    record.typeVolcano = data.typeVolcano;
    record.description = data.description;

    await record.save();
    return record;
};

//todo add function to only update likes/votes or whatever its required

async function voteVolcano(volcanoId, userId) {
    const record = await Volcano.findById(volcanoId);

    if (!record) {
        throw new ReferenceError('Record not found' + volcanoId);

    }

    if (record.author.toString() == userId) {
        throw new Error('Acess denied');

    }
    
    if (record.voteList.find(v => v.toString() == userId)) {
        throw new Error('Only 1 vote is allowed per volcano');
        return;
    }
    
    record.voteList.push(userId);

    await record.save();
    return record;
}


async function deleteById(id, userId) {
    const record = await Volcano.findById(id);

    if (!record) {
        throw new ReferenceError('Record not found' + id);

    }

    if (record.author.toString() != userId) {
        throw new Error('Acess denied');

    }

    await Volcano.findByIdAndDelete(id);
}


module.exports = {
    getAll,
    getRecent,
    getById,
    create,
    update,
    deleteById,
    voteVolcano,
    getByAuthorId,
    searchVolcanoes
};
