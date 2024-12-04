import { dataSource } from "../config/orm.config.js";
import { AdministratorSchema } from "../schemas/administrator.schema.js";
import { CourseMapSchema } from "../schemas/course-map.schema.js";
import { SubjectSchema } from "../schemas/subject.schema.js";
import {StudentSchema} from "../schemas/student.schema.js";
import { TeacherSchema } from "../schemas/teacher.schema.js";
import { StudentCourseMapSchema } from "../schemas/student-course-map.schema.js";
import { ClassSchema } from "../schemas/class.schema.js";

export class SeedService {
  constructor() {
    this.courseMapRepository = dataSource.getRepository(CourseMapSchema);
    this.subjectRepository = dataSource.getRepository(SubjectSchema);
    this.administratorRepository = dataSource.getRepository(AdministratorSchema);
    this.studentRepostory = dataSource.getRepository(StudentSchema);
    this.teacherRepostory = dataSource.getRepository(TeacherSchema);
    this.studentCourseMapRepository  = dataSource.getRepository(StudentCourseMapSchema);
    this.classRepository = dataSource.getRepository(ClassSchema);

  }

  async seed() {
    await this.#createAdministrator();
    const teacher = await this.#createTeacher();
    const courseMap = await this.#createCourseMap();
    const subjects = await this.#createSubjects(courseMap);
    const student = await this.#createStudent();
    await this.#createTeacherSubject(teacher,subjects);
    await this.#createStudentCoruseMap(student,courseMap)
    await this.#createClasse(subjects,teacher)

  }

  async #createTeacherSubject(teacher){

    const subjects = await this.subjectRepository.find({
      relations: ["teachers"],
    });

    for(let subject of subjects){
        subject.teachers.push(teacher)
        await this.subjectRepository.save(subject);
    }
  }

  async #createStudentCoruseMap(student,courseMap) {
    const studentCourseMap = this.studentCourseMapRepository.create({
      student: student,
      courseMap: courseMap
    });

    await this.studentCourseMapRepository.save(studentCourseMap);
  }

  async #createTeacher() {
    const teacher = this.teacherRepostory.create({
      names: 'Gibran',
      fatherLastName: 'Duran',
      motherLastName: 'Solano',
      password: '123456',
      email: 'teacher@teacher.com'
    });
    await this.teacherRepostory.save(teacher);
    return teacher;
  }

  async #createStudent() {
    const student = this.studentRepostory.create({
      names: 'Juan',
      fatherLastName: 'Perez',
      motherLastName: 'Rubro',
      password: '123456',
      email: 'student@student.com'
    });
    await this.studentRepostory.save(student);
    return student;
  }

  async #createAdministrator() {
    const administrator = this.administratorRepository.create({
      names: 'Admin admin',
      fatherLastName: 'Admin',
      motherLastName: 'Admin',
      password: '123456',
      email: 'admin@admin.com'
    });
    await this.administratorRepository.save(administrator);
    return administrator;
  }

  async #createCourseMap() {
    const courseMap = this.courseMapRepository.create({
      year: 2016,
      semesters: 8,
    });
    return await this.courseMapRepository.save(courseMap);
  }

  async #createClasse(subjects,teacher){

    for(let semester of subjects){
      for(let subject of semester){

        const { startTime, days, duration } = this.getSchedule();
        const classroom = this.getRandomClassroom();
        const description = this.getRandomDescription();

        const classCreated = await this.classRepository.save(
          {
            startTime: startTime,
            duration: duration,
            days: days,
            classroom: classroom,
            description: `Bienvenido a la clase de ${subject.name}`,
            subject:subject,
            teacher: teacher
          }
        );
      }
    }

  }

  getSchedule() {
    // Duración aleatoria entre 60, 90 o 180 minutos
    const durations = [60, 90, 180];
    const duration = durations[Math.floor(Math.random() * durations.length)];

    // Configuración de días según la duración
    let days;
    switch (duration) {
      case 60: // 3 días a la semana
        days = 'L,X,V';
        break;
      case 90: // 2 días a la semana
        days = 'M,J';
        break;
      case 180: // 1 día a la semana
        days = 'S';
        break;
    }

    // Generar un horario de inicio aleatorio (entre 8:00 AM y 6:00 PM)
    const hour = Math.floor(Math.random() * 10) + 8; // 8 a 18
    const minute = Math.floor(Math.random() * 2) * 30; // 0 o 30 minutos
    const startTime = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}:00`;

    return { startTime, days, duration };
  }

  getRandomClassroom() {
    // Nombres de aulas aleatorios
    const classrooms = ['A101', 'B202', 'C303', 'D404', 'E505'];
    return classrooms[Math.floor(Math.random() * classrooms.length)];
  }

  getRandomDescription() {
    // Descripciones predefinidas
    const descriptions = [
      'Introductory class',
      'Lab session',
      'Advanced topics',
      'Group discussion',
      'Exam preparation'
    ];
    return descriptions[Math.floor(Math.random() * descriptions.length)];
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
    const {
      electiveGeneralTrainingII,
      computationalNumericalMethods,
      softwareTesting,
      webApplications,
      softwareProjectManagement,
      requirementsEngineering,
      softwareArchitecture,
      universityEnglishB1II,
    } = await this.#createSubjectsFifthSemester(courseMap, {
      linearAlgebra,
      programmingIII,
      probabilityStatistics,
      softwareDesign,
      computerSecurity,
      advancedDatabases,
      projectManagement,
      processModeling,
      universityEnglishB1,
    });
    const {
      technologicalInnovation,
      distributedSystems,
      mobileApplications,
      embeddedSystems,
      softwareIntegrationProject,
      interactiveSystemsDesign,
      enterpriseArchitectures,
      universityEnglishB1III,
    } = await this.#createSubjectsSixthSemester(courseMap, {
      advancedDatabases,
      softwareArchitecture,
      webApplications,
      softwareProjectManagement,
      requirementsEngineering,
      softwareTesting,
      universityEnglishB1II,
    });
    const {
      prototypeImplementation,
      generalTrainingTopic,
      softwareQuality,
      agileDevelopmentMethods,
      topicI,
      topicII,
      electiveAccentuation
    } = await this.#createSubjectsSeventhSemester(courseMap, {
      webApplications,
      technologicalInnovation
    });
    const {
      titrationSeminar,
      professionalPractice,
      softwareEvaluation,
      informationTechnologiesBusiness
    } = await this.#createSubjectsEighthSemester(courseMap, {
      softwareIntegrationProject,
      softwareQuality
    });

    return [
      [
        business,
        math,
        discreteMath,
        programming,
        tutoring,
        softwareEngineering,
        computerArchitecture,
        introductoryEnglish,
      ],
      [
        effectiveCommunication,
        calculus,
        computationalMath,
        programmingII,
        administrationFoundations,
        tutoringII,
        operatingSystems,
        universityEnglishA1,
      ],
      [
        problemSolution,
        linearAlgebra,
        probabilityStatistics,
        programmingIII,
        databases,
        dataStructures,
        networks,
        universityEnglishA2,
      ],
      [
        electiveGeneralTrainingI,
        appliedStatistics,
        computerSecurity,
        advancedDatabases,
        projectManagement,
        processModeling,
        softwareDesign,
        universityEnglishB1,
      ],
      [
        electiveGeneralTrainingII,
        computationalNumericalMethods,
        softwareTesting,
        webApplications,
        softwareProjectManagement,
        requirementsEngineering,
        softwareArchitecture,
        universityEnglishB1II,
      ],
      [
        technologicalInnovation,
        distributedSystems,
        mobileApplications,
        embeddedSystems,
        softwareIntegrationProject,
        interactiveSystemsDesign,
        enterpriseArchitectures,
        universityEnglishB1III,
      ],
      [
        prototypeImplementation,
        generalTrainingTopic,
        softwareQuality,
        agileDevelopmentMethods,
        topicI,
        topicII,
        electiveAccentuation
      ],
      [
        titrationSeminar,
        professionalPractice,
        softwareEvaluation,
        informationTechnologiesBusiness
      ],
    ]
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
      subjectsRequirements: [databases, programmingII, networks],
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

  async #createSubjectsFifthSemester(
    courseMap,
    {
      linearAlgebra,
      programmingIII,
      probabilityStatistics,
      softwareDesign,
      computerSecurity,
      advancedDatabases,
      projectManagement,
      processModeling,
      universityEnglishB1,
    }
  ) {
    //Optativa de formación general II
    const electiveGeneralTrainingII = this.subjectRepository.create({
      name: "Optativa de formación general II",
      hoursPerWeek: 3,
      semester: 5,
      courseMap: courseMap,
    });
    await this.subjectRepository.save(electiveGeneralTrainingII);
    //Metodos numéricos computacionales
    const computationalNumericalMethods = this.subjectRepository.create({
      name: "Metodos numéricos computacionales",
      hoursPerWeek: 3,
      semester: 5,
      courseMap: courseMap,
      subjectsRequirements: [linearAlgebra],
    });
    await this.subjectRepository.save(computationalNumericalMethods);
    //Pruebas de software
    const softwareTesting = this.subjectRepository.create({
      name: "Pruebas de software",
      hoursPerWeek: 3,
      semester: 5,
      courseMap: courseMap,
      subjectsRequirements: [probabilityStatistics, softwareDesign, programmingIII],
    });
    await this.subjectRepository.save(softwareTesting);
    //Aplicaciones web
    const webApplications = this.subjectRepository.create({
      name: "Aplicaciones web",
      hoursPerWeek: 3,
      semester: 5,
      courseMap: courseMap,
      subjectsRequirements: [
        softwareDesign,
        computerSecurity,
        advancedDatabases,
      ],
    });
    await this.subjectRepository.save(webApplications);
    //Administración de proyectos de software
    const softwareProjectManagement = this.subjectRepository.create({
      name: "Administración de proyectos de software",
      hoursPerWeek: 3,
      semester: 5,
      courseMap: courseMap,
      subjectsRequirements: [projectManagement],
    });
    await this.subjectRepository.save(softwareProjectManagement);
    //Ingeniería de requisitos
    const requirementsEngineering = this.subjectRepository.create({
      name: "Ingeniería de requisitos",
      hoursPerWeek: 3,
      semester: 5,
      courseMap: courseMap,
      subjectsRequirements: [processModeling],
    });
    await this.subjectRepository.save(requirementsEngineering);
    //Arquitectura de software
    const softwareArchitecture = this.subjectRepository.create({
      name: "Arquitectura de software",
      hoursPerWeek: 3,
      semester: 5,
      courseMap: courseMap,
      subjectsRequirements: [softwareDesign, computerSecurity],
    });
    await this.subjectRepository.save(softwareArchitecture);
    //Inglés universitario B1 II
    const universityEnglishB1II = this.subjectRepository.create({
      name: "Inglés universitario B1 II",
      hoursPerWeek: 3,
      semester: 5,
      courseMap: courseMap,
      subjectsRequirements: [universityEnglishB1],
    });
    await this.subjectRepository.save(universityEnglishB1II);
    return {
      electiveGeneralTrainingII,
      computationalNumericalMethods,
      softwareTesting,
      webApplications,
      softwareProjectManagement,
      requirementsEngineering,
      softwareArchitecture,
      universityEnglishB1II,
    };
  }

  async #createSubjectsSixthSemester(courseMap, { advancedDatabases, softwareArchitecture, webApplications, softwareProjectManagement, requirementsEngineering, softwareTesting, universityEnglishB1II }) {
    //Innovación tecnológica
    const technologicalInnovation = this.subjectRepository.create({
      name: "Innovación tecnológica",
      hoursPerWeek: 3,
      semester: 6,
      courseMap: courseMap,
    });
    await this.subjectRepository.save(technologicalInnovation);
    //Sistemas distribuidos
    const distributedSystems = this.subjectRepository.create({
      name: "Sistemas distribuidos",
      hoursPerWeek: 3,
      semester: 6,
      courseMap: courseMap,
      subjectsRequirements: [softwareArchitecture, webApplications],
    });
    await this.subjectRepository.save(distributedSystems);
    //Aplicaciones móviles
    const mobileApplications = this.subjectRepository.create({
      name: "Aplicaciones móviles",
      hoursPerWeek: 3,
      semester: 6,
      courseMap: courseMap,
      subjectsRequirements: [webApplications, softwareArchitecture],
    });
    await this.subjectRepository.save(mobileApplications);
    //Sistemas empotrados
    const embeddedSystems = this.subjectRepository.create({
      name: "Sistemas empotrados",
      hoursPerWeek: 3,
      semester: 6,
      courseMap: courseMap,
    });
    await this.subjectRepository.save(embeddedSystems);
    //Proyecto de Software Integrador
    const softwareIntegrationProject = this.subjectRepository.create({
      name: "Proyecto de Software Integrador",
      hoursPerWeek: 3,
      semester: 6,
      courseMap: courseMap,
      subjectsRequirements: [softwareArchitecture, softwareProjectManagement, requirementsEngineering, softwareTesting, advancedDatabases],
    });
    await this.subjectRepository.save(softwareIntegrationProject);
    //Diseño de sistemas Interactivos
    const interactiveSystemsDesign = this.subjectRepository.create({
      name: "Diseño de sistemas Interactivos",
      hoursPerWeek: 3,
      semester: 6,
      courseMap: courseMap,
      subjectsRequirements: [requirementsEngineering]
    });
    await this.subjectRepository.save(interactiveSystemsDesign);
    //Arquitecturas Empresariales
    const enterpriseArchitectures = this.subjectRepository.create({
      name: "Arquitecturas Empresariales",
      hoursPerWeek: 3,
      semester: 6,
      courseMap: courseMap,
      subjectsRequirements: [softwareArchitecture]
    });
    await this.subjectRepository.save(enterpriseArchitectures);
    //Inglés universitario B1 III
    const universityEnglishB1III = this.subjectRepository.create({
      name: "Inglés universitario B1 III",
      hoursPerWeek: 3,
      semester: 6,
      courseMap: courseMap,
      subjectsRequirements: [universityEnglishB1II]
    });
    await this.subjectRepository.save(universityEnglishB1III);
    return {
      technologicalInnovation,
      distributedSystems,
      mobileApplications,
      embeddedSystems,
      softwareIntegrationProject,
      interactiveSystemsDesign,
      enterpriseArchitectures,
      universityEnglishB1III,
    };
  }

  async #createSubjectsSeventhSemester(courseMap, { webApplications, technologicalInnovation }) {
    //Implementación de prototipos
    const prototypeImplementation = this.subjectRepository.create({
      name: "Implementación de prototipos",
      hoursPerWeek: 3,
      semester: 7,
      courseMap: courseMap,
      subjectsRequirements: [technologicalInnovation]
    });
    await this.subjectRepository.save(prototypeImplementation);
    //Topico de Formación General
    const generalTrainingTopic = this.subjectRepository.create({
      name: "Topico de Formación General",
      hoursPerWeek: 3,
      semester: 7,
      courseMap: courseMap
    });
    await this.subjectRepository.save(generalTrainingTopic);
    //Calidad de Software
    const softwareQuality = this.subjectRepository.create({
      name: "Calidad de Software",
      hoursPerWeek: 3,
      semester: 7,
      courseMap: courseMap,
      subjectsRequirements: [webApplications]
    });
    await this.subjectRepository.save(softwareQuality);
    //Métodos Ágiles de Desarrollo
    const agileDevelopmentMethods = this.subjectRepository.create({
      name: "Métodos Ágiles de Desarrollo",
      hoursPerWeek: 3,
      semester: 7,
      courseMap: courseMap,
      subjectsRequirements: [webApplications]
    });
    await this.subjectRepository.save(agileDevelopmentMethods);
    //Tópico I
    const topicI = this.subjectRepository.create({
      name: "Tópico I",
      hoursPerWeek: 3,
      semester: 7,
      courseMap: courseMap
    });
    await this.subjectRepository.save(topicI);
    //Tópico II
    const topicII = this.subjectRepository.create({
      name: "Tópico II",
      hoursPerWeek: 3,
      semester: 7,
      courseMap: courseMap
    });
    await this.subjectRepository.save(topicII);
    //Optativa de acentuación
    const electiveAccentuation = this.subjectRepository.create({
      name: "Optativa de acentuación",
      hoursPerWeek: 3,
      semester: 7,
      courseMap: courseMap
    });
    await this.subjectRepository.save(electiveAccentuation);
    return {
      prototypeImplementation,
      generalTrainingTopic,
      softwareQuality,
      agileDevelopmentMethods,
      topicI,
      topicII,
      electiveAccentuation
    }
  }

  async #createSubjectsEighthSemester(courseMap, { softwareIntegrationProject, softwareQuality }) {
    //Seminario de titulación
    const titrationSeminar = this.subjectRepository.create({
      name: "Seminario de titulación",
      hoursPerWeek: 3,
      semester: 8,
      courseMap: courseMap,
    });
    await this.subjectRepository.save(titrationSeminar);
    //Práctica Profesional
    const professionalPractice = this.subjectRepository.create({
      name: "Práctica Profesional",
      hoursPerWeek: 3,
      semester: 8,
      courseMap: courseMap,
      subjectsRequirements: [softwareIntegrationProject]
    });
    await this.subjectRepository.save(professionalPractice);
    //Evalución de Software
    const softwareEvaluation = this.subjectRepository.create({
      name: "Evalución de Software",
      hoursPerWeek: 3,
      semester: 8,
      courseMap: courseMap,
      subjectsRequirements: [softwareQuality]
    });
    await this.subjectRepository.save(softwareEvaluation);
    //Tecnologías de Información para Negocios
    const informationTechnologiesBusiness = this.subjectRepository.create({
      name: "Tecnologías de Información para Negocios",
      hoursPerWeek: 3,
      semester: 8,
      courseMap: courseMap
    });
    await this.subjectRepository.save(informationTechnologiesBusiness);
    return {
      titrationSeminar,
      professionalPractice,
      softwareEvaluation,
      informationTechnologiesBusiness
    }
  }
}
