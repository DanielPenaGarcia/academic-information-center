import { dataSource } from "../config/orm.config.js";
import { CourseMapSchema } from "../schemas/course-map.schema.js";
import { SubjectSchema } from "../schemas/subject.schema.js";

export class SeedService {
  constructor() {
    this.courseMapRepository = dataSource.getRepository(CourseMapSchema);
    this.subjectRepository = dataSource.getRepository(SubjectSchema);
  }

  async seed() {
    const courseMap = await this.#createCourseMap();
    await this.#createSubjects(courseMap);
  }

  async #createCourseMap() {
    const courseMap = this.courseMapRepository.create({
      year: 2016,
      semesters: 8,
    });
    return await this.courseMapRepository.save(courseMap);
  }

  async #createSubjects(courseMap) {
    const {
      business,
      math,
      discreteMath,
      programming,
      tutoring,
      softwareEngineering,
      computerArchitecture,
      introductoryEnglish,
    } = await this.#createSubjectsFirstSemester(courseMap);
    const {
      effectiveCommunication,
      calculus,
      computationalMath,
      programmingII,
      administrationFoundations,
      tutoringII,
      operatingSystems,
      universityEnglishA1,
    } = await this.#createSubjectsSecondSemester(courseMap, {
      math,
      discreteMath,
      programming,
      computerArchitecture,
      introductoryEnglish,
    });
    const {
      problemSolution,
      linearAlgebra,
      probabilityStatistics,
      programmingIII,
      databases,
      dataStructures,
      networks,
      universityEnglishA2,
    } = await this.#createSubjectsThirdSemester(courseMap, {
      programmingII,
      discreteMath,
      operatingSystems,
      universityEnglishA1,
    });
    const {
      electiveGeneralTrainingI,
      appliedStatistics,
      computerSecurity,
      advancedDatabases,
      projectManagement,
      processModeling,
      softwareDesign,
      universityEnglishB1,
    } = await this.#createSubjectsFourthSemester(courseMap, {
      probabilityStatistics,
      networks,
      databases,
      programmingII,
      universityEnglishA2,
    });
  }

  async #createSubjectsFirstSemester(courseMap) {
    //Emprendimiento
    const business = this.subjectRepository.create({
      name: "Emprendimiento",
      hoursPerWeek: 3,
      semester: 1,
      courseMap: courseMap,
    });
    await this.subjectRepository.save(business);
    //Fundamentos de matemáticas
    const math = this.subjectRepository.create({
      name: "Fundamentos de matemáticas",
      hoursPerWeek: 5,
      semester: 1,
      courseMap: courseMap,
    });
    await this.subjectRepository.save(math);
    //Matemáticas discretas
    const discreteMath = this.subjectRepository.create({
      name: "Matemáticas discretas",
      hoursPerWeek: 5,
      semester: 1,
      courseMap: courseMap,
    });
    await this.subjectRepository.save(discreteMath);
    //Programación I con Laboratorio
    const programming = this.subjectRepository.create({
      name: "Programación I con Laboratorio",
      hoursPerWeek: 3,
      semester: 1,
      courseMap: courseMap,
    });
    await this.subjectRepository.save(programming);
    //Tutoría I
    const tutoring = this.subjectRepository.create({
      name: "Tutoría I",
      hoursPerWeek: 1,
      semester: 1,
      courseMap: courseMap,
    });
    await this.subjectRepository.save(tutoring);
    //Ingeniería de Software
    const softwareEngineering = this.subjectRepository.create({
      name: "Ingeniería de Software",
      hoursPerWeek: 3,
      semester: 1,
      courseMap: courseMap,
    });
    await this.subjectRepository.save(softwareEngineering);
    //Arquitectura de Computadoras
    const computerArchitecture = this.subjectRepository.create({
      name: "Arquitectura de Computadoras",
      hoursPerWeek: 3,
      semester: 1,
      courseMap: courseMap,
    });
    await this.subjectRepository.save(computerArchitecture);
    //Inglés introductorio
    const introductoryEnglish = this.subjectRepository.create({
      name: "Inglés introductorio",
      hoursPerWeek: 3,
      semester: 1,
      courseMap: courseMap,
    });
    await this.subjectRepository.save(introductoryEnglish);
    return {
      business,
      math,
      discreteMath,
      programming,
      tutoring,
      softwareEngineering,
      computerArchitecture,
      introductoryEnglish,
    };
  }

  async #createSubjectsSecondSemester(
    courseMap,
    {
      math,
      discreteMath,
      programming,
      computerArchitecture,
      introductoryEnglish,
    }
  ) {
    //Comunicación efectiva
    const effectiveCommunication = this.subjectRepository.create({
      name: "Comunicación efectiva",
      hoursPerWeek: 3,
      semester: 2,
      courseMap: courseMap,
    });
    await this.subjectRepository.save(effectiveCommunication);
    //Cálculo
    const calculus = this.subjectRepository.create({
      name: "Cálculo",
      hoursPerWeek: 5,
      semester: 2,
      courseMap: courseMap,
      subjectsRequirements: [math],
    });
    await this.subjectRepository.save(calculus);
    //Matemáticas computacionales
    const computationalMath = this.subjectRepository.create({
      name: "Matemáticas computacionales",
      hoursPerWeek: 5,
      semester: 2,
      courseMap: courseMap,
      subjectsRequirements: [discreteMath],
    });
    await this.subjectRepository.save(computationalMath);
    //Programación II con Laboratorio
    const programmingII = this.subjectRepository.create({
      name: "Programación II con Laboratorio",
      hoursPerWeek: 3,
      semester: 2,
      courseMap: courseMap,
      subjectsRequirements: [programming],
    });
    await this.subjectRepository.save(programmingII);
    //Fundamentos de administración
    const administrationFoundations = this.subjectRepository.create({
      name: "Fundamentos de administración",
      hoursPerWeek: 3,
      semester: 2,
      courseMap: courseMap,
    });
    await this.subjectRepository.save(administrationFoundations);
    //Tutoría II
    const tutoringII = this.subjectRepository.create({
      name: "Tutoría II",
      hoursPerWeek: 1,
      semester: 2,
      courseMap: courseMap,
    });
    await this.subjectRepository.save(tutoringII);
    //Sistemas operativos
    const operatingSystems = this.subjectRepository.create({
      name: "Sistemas operativos",
      hoursPerWeek: 3,
      semester: 2,
      courseMap: courseMap,
      subjectsRequirements: [computerArchitecture],
    });
    await this.subjectRepository.save(operatingSystems);
    //Inglés Universitario A1
    const universityEnglishA1 = this.subjectRepository.create({
      name: "Inglés Universitario A1",
      hoursPerWeek: 3,
      semester: 2,
      courseMap: courseMap,
      subjectsRequirements: [introductoryEnglish],
    });
    await this.subjectRepository.save(universityEnglishA1);
    return {
      effectiveCommunication,
      calculus,
      computationalMath,
      programmingII,
      administrationFoundations,
      tutoringII,
      operatingSystems,
      universityEnglishA1,
    };
  }

  async #createSubjectsThirdSemester(
    courseMap,
    { programmingII, discreteMath, operatingSystems, universityEnglishA1 }
  ) {
    //Solución de problemas
    const problemSolution = this.subjectRepository.create({
      name: "Solución de problemas",
      hoursPerWeek: 3,
      semester: 3,
      courseMap: courseMap,
    });
    await this.subjectRepository.save(problemSolution);
    //Algebra lineal
    const linearAlgebra = this.subjectRepository.create({
      name: "Algebra lineal",
      hoursPerWeek: 3,
      semester: 3,
      courseMap: courseMap,
    });
    await this.subjectRepository.save(linearAlgebra);
    //Probabilidad y estadística
    const probabilityStatistics = this.subjectRepository.create({
      name: "Probabilidad y estadística",
      hoursPerWeek: 3,
      semester: 3,
      courseMap: courseMap,
    });
    await this.subjectRepository.save(probabilityStatistics);
    //Programación III
    const programmingIII = this.subjectRepository.create({
      name: "Programación III",
      hoursPerWeek: 3,
      semester: 3,
      courseMap: courseMap,
      subjectsRequirements: [programmingII],
    });
    await this.subjectRepository.save(programmingIII);
    //Bases de datos
    const databases = this.subjectRepository.create({
      name: "Bases de datos",
      hoursPerWeek: 3,
      semester: 3,
      courseMap: courseMap,
      subjectsRequirements: [discreteMath],
    });
    await this.subjectRepository.save(databases);
    //Estructura de datos
    const dataStructures = this.subjectRepository.create({
      name: "Estructura de datos",
      hoursPerWeek: 3,
      semester: 3,
      courseMap: courseMap,
      subjectsRequirements: [programmingII],
    });
    await this.subjectRepository.save(dataStructures);
    //Redes
    const networks = this.subjectRepository.create({
      name: "Redes",
      hoursPerWeek: 3,
      semester: 3,
      courseMap: courseMap,
      subjectsRequirements: [operatingSystems],
    });
    await this.subjectRepository.save(networks);
    //Inglés Universitario A2
    const universityEnglishA2 = this.subjectRepository.create({
      name: "Inglés Universitario A2",
      hoursPerWeek: 3,
      semester: 3,
      courseMap: courseMap,
      subjectsRequirements: [universityEnglishA1],
    });
    await this.subjectRepository.save(universityEnglishA2);
    return {
      problemSolution,
      linearAlgebra,
      probabilityStatistics,
      programmingIII,
      databases,
      dataStructures,
      networks,
      universityEnglishA2,
    };
  }

  async #createSubjectsFourthSemester(
    courseMap,
    {
      probabilityStatistics,
      networks,
      databases,
      programmingII,
      universityEnglishA2,
    }
  ) {
    //Optativa de formación general I
    const electiveGeneralTrainingI = this.subjectRepository.create({
      name: "Optativa de formación general I",
      hoursPerWeek: 3,
      semester: 4,
      courseMap: courseMap,
    });
    await this.subjectRepository.save(electiveGeneralTrainingI);
    //Estadística aplicada
    const appliedStatistics = this.subjectRepository.create({
      name: "Estadística aplicada",
      hoursPerWeek: 3,
      semester: 4,
      courseMap: courseMap,
      subjectsRequirements: [probabilityStatistics],
    });
    await this.subjectRepository.save(appliedStatistics);
    //Seguridad informática
    const computerSecurity = this.subjectRepository.create({
      name: "Seguridad informática",
      hoursPerWeek: 3,
      semester: 4,
      courseMap: courseMap,
      subjectsRequirements: [networks],
    });
    await this.subjectRepository.save(computerSecurity);
    //Bases de datos avanzadas
    const advancedDatabases = this.subjectRepository.create({
      name: "Bases de datos avanzadas",
      hoursPerWeek: 3,
      semester: 4,
      courseMap: courseMap,
      subjectsRequirements: [databases],
    });
    await this.subjectRepository.save(advancedDatabases);
    //Administración de proyectos
    const projectManagement = this.subjectRepository.create({
      name: "Administración de proyectos",
      hoursPerWeek: 3,
      semester: 4,
      courseMap: courseMap,
      subjectsRequirements: [networks],
    });
    await this.subjectRepository.save(projectManagement);
    //Modelado de procesos
    const processModeling = this.subjectRepository.create({
      name: "Modelado de procesos",
      hoursPerWeek: 3,
      semester: 4,
      courseMap: courseMap,
    });
    await this.subjectRepository.save(processModeling);
    //Diseño de software
    const softwareDesign = this.subjectRepository.create({
      name: "Diseño de software",
      hoursPerWeek: 3,
      semester: 4,
      courseMap: courseMap,
      subjectsRequirements: [programmingII],
    });
    await this.subjectRepository.save(softwareDesign);
    //Inglés Universitario B1
    const universityEnglishB1 = this.subjectRepository.create({
      name: "Inglés Universitario B1",
      hoursPerWeek: 3,
      semester: 4,
      courseMap: courseMap,
      subjectsRequirements: [universityEnglishA2],
    });
    await this.subjectRepository.save(universityEnglishB1);
    return {
      electiveGeneralTrainingI,
      appliedStatistics,
      computerSecurity,
      advancedDatabases,
      projectManagement,
      processModeling,
      softwareDesign,
      universityEnglishB1,
    };
  }
}
