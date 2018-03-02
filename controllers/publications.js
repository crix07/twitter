const config = require('../config')

const Publication = require('../models/publications')


function getPublics(req, res) {

    Publication.find({}).populate('user')
        .exec((err, publications) => {
            if (err) return res.status(500).send({ message: `error ${err}` });
            return res.status(200).send({ publications })
        })

}

function deletePublic(req, res) {
    let publicId = req.params.id;
    Publication.remove({ _id: publicId }, (err) => {
        if (err) return res.status(500).send({ message: `error ${err}` });
        return res.status(200).send({ message: 'eliminado' })
    })
}



function createPublic(req, res) {
    let public = new Publication();
    let userId = req.user.sub

    public.text = req.body.text;
    public.user = userId;
    public.save((err, publicStored) => {
        if (err) return res.status(500).send({ message: `error ${err}` });
        return res.status(200).send({ publicStored });
    });
}

module.exports = {
    createPublic,
    getPublics,
    deletePublic
}