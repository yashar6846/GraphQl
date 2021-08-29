const graphql = require("graphql");
const lod = require("lodash");
const Teacher = require("../models/teacher");
const Lesson = require("../models/lesson");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
} = graphql;

const LessonType = new GraphQLObjectType({
  name: "lesson",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    group: { type: GraphQLString },
    teacher: {
      type: TeacherType,
      resolve(parent, args) {
        console.log(parent);
        return Lesson.find({ teacherId: parent.id });
        // return lod.find(teachers, { id: parent.teacherId });
      },
    },
  }),
});

const TeacherType = new GraphQLObjectType({
  name: "teacher",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    lessons: {
      type: new GraphQLList(LessonType),
      resolve(parent, args) {
        return lod.filter(lessons, { teacherId: parent.id });
      },
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    lesson: {
      type: LessonType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Lesson.findById(args.id);
        // return lod.find(lessons, { id: args.id });
      },
    },
    teacher: {
      type: TeacherType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Teacher.findById(args.id);
        // return lod.find(teachers, { id: args.id });
      },
    },
    lessons: {
      type: new GraphQLList(LessonType),
      resolve() {
        return Lesson.find({});
        // return lessons;
      },
    },
    teachers: {
      type: new GraphQLList(TeacherType),
      resolve() {
        return Teacher.find({});
        // return teachers;
      },
    },
  },
});
const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addTeacher: {
      type: TeacherType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: GraphQLInt },
      },
      resolve(parent, args) {
        let teacher = new Teacher({
          name: args.name,
          age: args.age,
        });
        return teacher.save();
      },
    },
    addLesson: {
      type: LessonType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        group: { type: new GraphQLNonNull(GraphQLString) },
        teacherId: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        let lesson = new Lesson({
          name: args.name,
          group: args.group,
          teacherId: args.teacherId,
        });
        return lesson.save();
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
