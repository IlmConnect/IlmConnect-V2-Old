import { Role } from "@prisma/client"
import { Request } from "express"
import { AuthorizationRule, UserWithoutPassword } from ".."

export enum Domain {
	School = 'school',
	Course = 'course'
}

export enum Permission {
	View = 'view',
	Edit = 'edit',
	Manage = 'manage'
}

export enum Group {
	Admin = 'admin',
	Course = 'course',
}

// TODO: typing
const ROLES = {
	[Role.ADMIN]: {
		[Domain.School]: {
			[Group.Admin]: [Permission.Manage]
		},
		[Domain.Course]: {}
	},
	[Role.TEACHER]: {
		[Domain.School]: {},
		[Domain.Course]: {
			[Group.Course]: [Permission.View, Permission.Edit]
		}
	}
}

type PermissionSet = { [k: Group]: Permission[] }

const PERMISSION_HIERARCHY: PermissionSet = {
	[Group.Admin]:					[Permission.Manage],
	[Group.Course]:					[Permission.View, Permission.Edit, Permission.Manage],
}

// TODO: for descriptions of each permission group ()
const details = {

}

type HasPermissionFunction = (domain: Domain, group: Group, permission: Permission, getCourseId?: (request: Request) => string) => AuthorizationRule


const getCourseRole = async (user: UserWithoutPassword, courseId?: string) => {
	return Role.ADMIN
}

export const hasPermisson: HasPermissionFunction = (
	domain,
	group,
	permission,
	getCourseId
) => async ({ user, request }) => {
	const userRole = domain === Domain.School?
		user.role :
		await getCourseRole(user, getCourseId?.(request))

	if (!userRole) return false
	
	const userPermissions = ROLES[userRole]?.[domain] as any

	if (!userPermissions) return false

	if (!userPermissions[group]?.find((p: Permission) => p === permission)) return false

	return true
}

