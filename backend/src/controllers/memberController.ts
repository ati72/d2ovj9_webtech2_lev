const Member = require('../model/Member');
import express, { Request, Response } from 'express';

export class MemberController {
  getAllMembers = async (req: Request, res: Response) => {
    const members = await Member.find();
    if (members.length <= 0) {
      return res.status(404).json('No members found');
    }
    res.json(members);
  };

  getMember = async (req: Request, res: Response) => {
    if (!req?.params?.id) {
      return res.status(400).json('Member id required');
    }

    try {
      const member = await Member.findOne({ _id: req.params.id }).exec();
      if (!member) {
        return res
          .status(404)
          .json('No employee found with id: ' + req.params.id);
      }
      res.json(member);
    } catch (error) {
      console.error(error);
      res.status(404).json('No employee found with id: ' + req.params.id);
    }
  };

  createNewMember = async (req: Request, res: Response) => {
    if (
      !req?.body?.firstName ||
      !req?.body?.lastName ||
      !req?.body?.idCardNumber ||
      !req?.body?.address
    ) {
      return res.status(400).json({
        message: 'First name, last name, id card, address  are required',
      });
    }

    try {
      const result = await Member.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        idCardNumber: req.body.idCardNumber,
        address: req.body.address,
      });
      res.status(201).json(result);
    } catch (err) {
      console.error(err);
    }
  };

  updateMember = async (req: Request, res: Response) => {
    if (!req?.params?.id) {
      return res.status(400).json('Member id required');
    }

    try {
      const member = await Member.findOne({ _id: req.params.id }).exec();
      if (!member) {
        return res
          .status(404)
          .json('No member found with id: ' + req.params.id);
      }
      if (req.body?.firstName) member.firstName = req.body.firstName;
      if (req.body?.lastName) member.lastName = req.body.lastName;
      if (req.body?.idCardNumber) member.idCardNumber = req.body.idCardNumber;
      if (req.body?.address) member.address = req.body.address;

      const result = await member.save();
      res.json(result);
    } catch (error) {
      console.log(error);
      res.status(404).json('No member found with id: ' + req.params.id);
    }
  };

  deleteMember = async (req: Request, res: Response) => {
    if (!req?.params?.id) {
      return res.status(400).json('Member id required');
    }
    try {
      const member = await Member.findOne({ _id: req.params.id }).exec();
      if (!member) {
        return res
          .status(404)
          .json('No member found with id: ' + req.params.id);
      }
      const result = member.deleteOne();
      res.json('Member deleted.');
    } catch (error) {
      console.log(error);
      res.status(404).json('No member found with id: ' + req.params.id);
    }
  };
}
