
export const adminEmails = ['alexia.roa@ug.uchile.cl', 'ignacio.arena@ug.uchile.cl'];

export function isAdmin(email: string | null | undefined): boolean {
    if (!email) {
        return false;
    }
    return adminEmails.includes(email);
}
