import { Role } from "@prisma/client"
import { Request } from "express"
import { AuthorizationRule, UserWithoutPassword } from ".."

const domains = [
	'school',
	'course'
] as const

type Domain = typeof domains[number]
type Action = 'view' | 'edit' | 'manage'

interface Permission {
	readonly key: string
	readonly label: string
	readonly actions: Action[]
}

// Typing garbage

const PERMISSIONS_LIST = [
	{ key: 'admin', label: 'Admin', actions: ['manage'] },
	{ key: 'course', label: 'Course', actions: ['view', 'edit', 'manage'] },
] as const

type PermissionKey = typeof PERMISSIONS_LIST[number]['key']

interface DomainPermissionRule {
	domain: Domain
	permission: PermissionKey
	action: Action
}

type PermissionsSet = {
	[d in Domain]: {
		[k in PermissionKey]: {
			[a in Action]: DomainPermissionRule
		}
	}
}

// Turns the permissions list above into a object with the structure: domain => permission => action
// Allows you to pass something like 'permissions.school.course.view' into the hasPermission function
export const permissions = Object.fromEntries(
	domains.map(domain => [
		domain,
		Object.fromEntries(
			PERMISSIONS_LIST.map((permission) => [
				permission.key as PermissionKey,
				Object.fromEntries(
					permission.actions.map(action => [
						action,
						{
							domain,
							permission: permission.key,
							action
						}
					])
				)
			])
		)
	])
) as PermissionsSet

type RolePermissionSet = {
	[r in Role]: {
		[d in Domain]?: {
			[p in PermissionKey]?: Action[]
		}
	}
}

// TODO: typing
const ROLES: RolePermissionSet = {
	[Role.ADMIN]: {
		school: {
			admin: ['manage']
		},
	},
	[Role.TEACHER]: {
		course: {
			course: ['view', 'edit']
		}
	}
}

type GetRoleFunction = (u: UserWithoutPassword) => Promise<Role | null>

export function hasPermisson (
	rule: DomainPermissionRule,
	getRole: GetRoleFunction
): AuthorizationRule {
	return async ({ user, request }) => {
		const role = await getRole(user)
		if (!role) return false

		return !!ROLES[role]?.[rule.domain]?.[rule.permission]?.includes(rule.action)
	}
}

export async function useSchoolRole(user: UserWithoutPassword) {
	return user.role
}

export function useCourseRole(getCourseId: () => string): GetRoleFunction {
	return async (u) => {
		return null
	}
}
