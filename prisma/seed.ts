import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding...');

  await prisma.usersOnOrganizations.deleteMany();
  await prisma.organizationRole.deleteMany();
  await prisma.projectMember.deleteMany();
  await prisma.projectTeam.deleteMany();
  await prisma.projectRole.deleteMany();
  await prisma.project.deleteMany();
  await prisma.organization.deleteMany();
  await prisma.user.deleteMany();

  // create mock users
  const mockPassword = 'password';
  await prisma.user.createMany({
    data: [
      {
        fio: 'Белый Сергей Иванов',
        email: 'bsi@yandex.ru',
        password: mockPassword,
      },
      {
        fio: 'Krisper Michael',
        email: 'km@gmail.com',
        password: mockPassword,
      },
    ],
  });
  const users = await prisma.user.findMany();

  // create mock orgs
  await prisma.organization.createMany({
    data: [
      {
        name: 'Kubikk',
      },
    ],
  });
  const organizations = await prisma.organization.findMany();

  // create mock organizations roles
  await prisma.organizationRole.createMany({
    data: [
      {
        label: 'admin',
        canManageMembers: true,
        canManageProjects: true,
        canRenameOrg: true,
        organizationId: organizations[0].id,
      },
      {
        label: 'member',
        canManageMembers: false,
        canManageProjects: false,
        canRenameOrg: false,
        organizationId: organizations[0].id,
      },
    ],
  });
  const organizationRoles = await prisma.organizationRole.findMany();

  // create mock users on orgs
  await prisma.usersOnOrganizations.createMany({
    data: [
      {
        userId: users[0].id,
        organizationId: organizations[0].id,
        roleId: organizationRoles[0].id,
      },
      {
        userId: users[1].id,
        organizationId: organizations[0].id,
        roleId: organizationRoles[1].id,
      },
    ],
  });

  // create projects for org
  await prisma.project.createMany({
    data: [
      {
        name: 'project-1',
        organizationId: organizations[0].id,
      },
      {
        name: 'project-2',
        organizationId: organizations[0].id,
      },
    ],
  });
  const projects = await prisma.project.findMany();

  // create projects Roles for project
  await prisma.projectRole.createMany({
    data: [
      {
        label: 'admin',
        projectId: projects[0].id,
        canManageProject: true,
        canManageTeams: true,
        canManageMembers: true,
        canInteractWithClients: true,
      },
      {
        label: 'member',
        projectId: projects[0].id,
        canManageProject: false,
        canManageTeams: false,
        canManageMembers: false,
        canInteractWithClients: false,
      },
    ],
  });
  const projectRoles = await prisma.projectRole.findMany();

  // create project team
  await prisma.projectTeam.createMany({
    data: [
      {
        label: 'team-1',
        projectId: projects[0].id,
        projectRoleId: projectRoles[0].id,
      },
    ],
  });
  const projectTeams = await prisma.projectTeam.findMany();

  // create project members
  await prisma.projectMember.createMany({
    data: [
      {
        userId: users[0].id,
        projectId: projects[0].id,
        projectTeamId: projectTeams[0].id,
      },
      {
        userId: users[1].id,
        projectId: projects[0].id,
        projectTeamId: projectTeams[0].id,
      },
    ],
  });
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
