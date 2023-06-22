import { PrismaClient, actors } from "@prisma/client";
import { Request, Response } from "express";

// var fresh = require('fresh');
// var etag = require('etag');

const prisma = new PrismaClient().actors;

// GET /actor
// Get all actors
exports.getAllActors = async (req: Request, res: Response) => {
  try {
    const actors = await prisma.findMany({
      include: {
        films_actors: true,
      },
    });
    res.status(200).json(actors);
  } catch (e: any) {
    res.status(500).json({ message: e.message });
  }
};

// GET /actor/:id
// Get actor by id
exports.getActorById = async (req: Request, res: Response) => {
  try {
    const actor = await prisma.findUnique({
      where: {
        id: parseInt(req.params.id),
      },
      include: {
        films_actors: true,
      },
    });
    if (!actor) {
      res.status(404).json({ message: "Actor not found" });
    } else {
      res.status(200).json(actor);
    }
  } catch (e: any) {
    res.status(500).json({ message: e.message });
  }
};

// POST /actor
// Create new actor
exports.createActor = async (req: Request, res: Response) => {
  const { first_name, last_name, date_of_birth, date_of_death } = req.body;

  try {
    if (!first_name || !last_name || !date_of_birth) {
      res.status(400).json("missing required fields");
    }

    const actor: actors = await prisma.create({
      data: {
        first_name: first_name,
        last_name: last_name,
        date_of_birth: date_of_birth,
        date_of_death: date_of_death ? date_of_death : undefined,
      },
    });
    res.status(201).json(actor);
  } catch (e: any) {
    res.status(500).json({ message: e.message, body: req.body });
  }
};

// PUT /actor/:id
// Update actor
exports.updateActor = async (req: Request, res: Response) => {
  const { first_name, last_name, date_of_birth, date_of_death } = req.body;

  try {
    const checkActor = await prisma.findUnique({
      where: {
        id: parseInt(req.params.id),
      },
    });
    if (!checkActor) {
      res.status(404).json({ message: "actor not found" });
    }

    let data: any = {};
    if (first_name) data.first_name = first_name;
    if (last_name) data.last_name = last_name;
    if (date_of_birth) data.date_of_birth = date_of_birth;
    if (date_of_death) data.date_of_death = date_of_death;

    if (Object.keys(data).length === 0) {
      res.status(400).json({ message: "missing required fields" });
    } else {
      const actor: actors = await prisma.update({
        where: {
          id: parseInt(req.params.id),
        },
        data,
      });
      res.status(200).json(actor);
    }
  } catch (e: any) {
    res.status(500).json({ message: e.message });
  }
};

// DELETE /actor/:id
// Delete actor
exports.deleteActor = async (req: Request, res: Response) => {
  try {
    const checkActor = await prisma.findUnique({
      where: {
        id: parseInt(req.params.id),
      },
    });
    if (!checkActor) {
      res.status(404).json({ message: "actor not found" });
    }

    const actor = await prisma.delete({
      where: {
        id: parseInt(req.params.id),
      },
    });
    res.status(204).json(actor);
  } catch (e: any) {
    res.status(500).json({ message: e.message });
  }
};

// check if ETag is fresh
// exports.isFresh = async (req: Request, res: Response) => {
//   try {
//     let reqHeader = { 'if-match': req.headers['if-match'] };
//     let resHeader = { 'etag': etag(JSON.stringify(req.body)) };
//     fresh(reqHeader, resHeader);
//   } catch (e: any) {
//     res.status(412).json({ message: e.message });
//   }
// };