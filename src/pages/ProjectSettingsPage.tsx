import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import authenticatedFetch from "../api/authenticatedFetch";
import { useAuth } from "../components/Auth/AuthProvider";
import Button from "../components/Buttons/Button";
import Spinner from "../components/Outros/Spinner";
import AlertCard from "../components/Card/AlertCard";
import toast from "react-hot-toast";
import "../styles/pages/ProjectSettingsPage.css";

interface Permissions {
    send_messages: boolean;
    read: boolean;
    create_chats: boolean;
    image: boolean;
    video: boolean;
}

interface Member {
    user_id: string;
    email: string;
    username?: string;
    role: "admin" | "member";
    permissions: Permissions;
}

interface Project {
    id: string;
    name: string;
    description: string;
    user_id: string;
    owner_email?: string;
    owner_username?: string;
    members: Member[];
}

export default function ProjectSettingsPage() {
    const { projeto: projectId } = useParams();
    const { userId, userEmail, username: currentUsername } = useAuth();
    const navigate = useNavigate();
    
    const [project, setProject] = useState<Project | null>(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<"geral" | "membros" | "perigo">("geral");
    
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    
    const [newMemberEmail, setNewMemberEmail] = useState("");
    const [newMemberRole, setNewMemberRole] = useState<"admin" | "member">("member");
    const [newMemberPermissions, setNewMemberPermissions] = useState<Permissions>({
        send_messages: true,
        read: true,
        create_chats: true,
        image: false,
        video: false
    });
    
    const [isDeleting, setIsDeleting] = useState(false);
    const [memberToRemove, setMemberToRemove] = useState<Member | null>(null);
    const [editingMember, setEditingMember] = useState<Member | null>(null);
    const [transferTargetEmail, setTransferTargetEmail] = useState("");
    const [isTransferring, setIsTransferring] = useState(false);

    useEffect(() => {
        fetchProject();
    }, [projectId]);

    async function fetchProject() {
        setLoading(true);
        const response = await authenticatedFetch(`project/${projectId}`, { method: "GET" });
        if (response.ok) {
            const data = await response.json();
            setProject(data);
            setName(data.name);
            setDescription(data.description || "");
        }
        setLoading(false);
    }

    const isOwner = project?.user_id && userId ? String(project.user_id) === String(userId) : false;
    const isAdmin = isOwner || (project?.members?.some(m => String(m.user_id) === String(userId) && m.role === "admin") ?? false);

    useEffect(() => {
        if (!loading && project && !isAdmin) {
            navigate(`/projetos/${projectId}/roteiro`);
        }
    }, [loading, project, isAdmin, navigate, projectId]);

    console.log("Settings Permission Debug:", { userId, projectOwner: project?.user_id, isOwner, isAdmin });

    async function handleUpdateGeneral() {
        const updatePromise = authenticatedFetch(`project/${projectId}`, {
            method: "PATCH",
            body: { name, description }
        }).then(async res => {
            if (!res.ok) throw new Error("Erro ao atualizar");
            return res;
        });

        toast.promise(updatePromise, {
            loading: 'Atualizando...',
            success: 'Projeto atualizado!',
            error: 'Erro ao atualizar projeto.',
        });
    }

    async function handleAddMember() {
        if (!newMemberEmail) return;
        
        const addPromise = authenticatedFetch(`project/${projectId}/members`, {
            method: "POST",
            body: { 
                email: newMemberEmail, 
                role: newMemberRole,
                permissions: newMemberPermissions
            }
        }).then(async res => {
            if (!res.ok) {
                const err = await res.json();
                throw new Error(err.detail || "Erro ao adicionar");
            }
            return res;
        });

        toast.promise(addPromise, {
            loading: 'Adicionando membro...',
            success: () => {
                setNewMemberEmail("");
                setNewMemberRole("member");
                setNewMemberPermissions({
                    send_messages: true,
                    read: true,
                    create_chats: true,
                    image: false,
                    video: false
                });
                fetchProject();
                return 'Membro adicionado!';
            },
            error: (err) => err.message,
        });
    }

    async function handleUpdateMember(email: string, role?: string, permissions?: Permissions) {
        const updatePromise = authenticatedFetch(`project/${projectId}/members/${email}`, {
            method: "PUT",
            body: { role, permissions }
        }).then(async res => {
            if (!res.ok) {
                const err = await res.json();
                throw new Error(err.detail || "Erro ao atualizar membro");
            }
            return res;
        });

        toast.promise(updatePromise, {
            loading: 'Atualizando membro...',
            success: () => {
                fetchProject();
                setEditingMember(null);
                return 'Membro atualizado!';
            },
            error: (err) => err.message,
        });
    }

    async function handleRemoveMember(email: string) {
        const removePromise = authenticatedFetch(`project/${projectId}/members/${email}`, {
            method: "DELETE"
        }).then(async res => {
            if (!res.ok) throw new Error("Erro ao remover");
            return res;
        });

        toast.promise(removePromise, {
            loading: 'Removendo membro...',
            success: () => {
                setMemberToRemove(null);
                fetchProject();
                return 'Membro removido!';
            },
            error: 'Erro ao remover membro.',
        });
    }

    async function handleTransferOwnership() {
        if (!transferTargetEmail) return;

        const transferPromise = authenticatedFetch(`project/${projectId}/transfer-ownership`, {
            method: "POST",
            body: { new_owner_email: transferTargetEmail }
        }).then(async res => {
            if (!res.ok) {
                const err = await res.json();
                throw new Error(err.detail || "Erro ao transferir");
            }
            return res;
        });

        toast.promise(transferPromise, {
            loading: 'Transferindo propriedade...',
            success: () => {
                setTimeout(() => navigate("/projetos"), 1500);
                return 'Propriedade transferida!';
            },
            error: (err) => err.message,
        });
    }

    async function handleDeleteProject() {
        const deletePromise = authenticatedFetch(`project/${projectId}`, { method: "DELETE" })
            .then(async res => {
                if (!res.ok) throw new Error("Erro ao excluir");
                return res;
            });

        toast.promise(deletePromise, {
            loading: 'Excluindo projeto...',
            success: () => {
                navigate("/projetos");
                return 'Projeto excluído com sucesso.';
            },
            error: 'Erro ao excluir projeto.',
        });
    }

    if (loading) return <div className="spinner_full_container"><Spinner message="Carregando configurações..." /></div>;
    if (!project) return <div>Projeto não encontrado.</div>;

    return (
        <div className="settings_page">
            <header className="settings_header">
                <h1>Configurações do Projeto</h1>
                <nav className="settings_tabs">
                    <button className={activeTab === "geral" ? "active" : ""} onClick={() => setActiveTab("geral")}>Geral</button>
                    <button className={activeTab === "membros" ? "active" : ""} onClick={() => setActiveTab("membros")}>Membros</button>
                    {isOwner && <button className={activeTab === "perigo" ? "active" : ""} onClick={() => setActiveTab("perigo")}>Zona de Perigo</button>}
                </nav>
            </header>

            <div className="settings_content">
                {activeTab === "geral" && (
                    <section className="settings_section">
                        <h2>Informações do Projeto</h2>
                        <div className="settings_form">
                            <div className="input_group">
                                <label>Nome do Projeto</label>
                                <input value={name} onChange={e => setName(e.target.value)} disabled={!isAdmin} />
                            </div>
                            <div className="input_group">
                                <label>Descrição</label>
                                <textarea value={description} onChange={e => setDescription(e.target.value)} disabled={!isAdmin} />
                            </div>
                            {isAdmin && <Button text="Salvar Alterações" onClick={handleUpdateGeneral} style="projeto_button" />}
                        </div>
                    </section>
                )}

                {activeTab === "membros" && (
                    <section className="settings_section">
                        <h2>Gerenciar Acesso</h2>
                        
                        {isAdmin && (
                            <div className="add_member_container">
                                <div className="add_member_form">
                                    <div className="input_group">
                                        <label>E-mail do novo membro</label>
                                        <input type="email" placeholder="usuario@email.com" value={newMemberEmail} onChange={e => setNewMemberEmail(e.target.value)} />
                                    </div>
                                    <div className="input_group">
                                        <label>Cargo</label>
                                        <select value={newMemberRole} onChange={e => setNewMemberRole(e.target.value as any)}>
                                            <option value="member">Membro</option>
                                            {isOwner && <option value="admin">Administrador</option>}
                                        </select>
                                    </div>
                                    <Button text="Convidar" onClick={handleAddMember} style="projeto_button" iconClass="fi fi-rr-user-add" />
                                </div>

                                {newMemberRole === "member" && (
                                    <div className="input_group full_width">
                                        <label>Permissões</label>
                                        <div className="add_member_permissions_inline">
                                            <label className="checkbox_group">
                                                <input 
                                                    type="checkbox" 
                                                    checked={newMemberPermissions.read} 
                                                    onChange={e => setNewMemberPermissions({...newMemberPermissions, read: e.target.checked})}
                                                />
                                                <span>Ler</span>
                                            </label>
                                            <label className="checkbox_group">
                                                <input 
                                                    type="checkbox" 
                                                    checked={newMemberPermissions.send_messages} 
                                                    onChange={e => setNewMemberPermissions({...newMemberPermissions, send_messages: e.target.checked})}
                                                />
                                                <span>Mensagens</span>
                                            </label>
                                            <label className="checkbox_group">
                                                <input 
                                                    type="checkbox" 
                                                    checked={newMemberPermissions.create_chats} 
                                                    onChange={e => setNewMemberPermissions({...newMemberPermissions, create_chats: e.target.checked})}
                                                />
                                                <span>Criar Chats</span>
                                            </label>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        <div className="members_list">
                            <div className={`member_item ${isOwner ? 'owner' : ''}`}>
                                <div className="member_info">
                                    <span className="member_email">
                                        {(isOwner ? (currentUsername || project.owner_username) : project.owner_username) || "Dono do Projeto"} {isOwner && "(Você)"}
                                        <span className="member_email_secondary"> ({(isOwner ? (userEmail || project.owner_email) : project.owner_email)})</span>
                                    </span>
                                    <span className="member_role_badge owner">Proprietário</span>
                                </div>
                            </div>
                            {project.members.map(member => {
                                const isMe = String(member.user_id) === String(userId);
                                return (
                                    <div key={member.email} className={`member_item ${isMe ? 'owner' : ''}`}>
                                        <div className="member_info">
                                            <span className="member_email">
                                                {member.username || member.email} {isMe && "(Você)"}
                                                {member.username && <span className="member_email_secondary"> ({member.email})</span>}
                                            </span>
                                            <span className={`member_role_badge ${member.role}`}>{member.role === "admin" ? "Administrador" : "Membro"}</span>
                                        </div>
                                        <div className="member_actions">
                                            <div className="member_perms_mini">
                                                {member.permissions.read && <i className="fi fi-rr-eye" title="Pode ler"></i>}
                                                {member.permissions.send_messages && <i className="fi fi-rr-paper-plane" title="Pode enviar mensagens"></i>}
                                                {member.permissions.create_chats && <i className="fi fi-rr-comment-alt" title="Pode criar chats"></i>}
                                            </div>
                                            {isAdmin && (isOwner || (member.role !== "admin" && !isMe)) && (
                                                <>
                                                    <button className="edit_member_btn" onClick={() => setEditingMember(member)} title="Editar permissões">
                                                        <i className="fi fi-rr-edit"></i>
                                                    </button>
                                                    <button className="remove_member_btn" onClick={() => setMemberToRemove(member)} title="Remover membro">
                                                        <i className="fi fi-rr-trash"></i>
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </section>
                )}

                {activeTab === "perigo" && isOwner && (
                    <section className="settings_section danger_zone">
                        <h2>Zona de Perigo</h2>
                        
                        <div className="danger_action">
                            <div className="danger_text">
                                <h3>Transferir Propriedade</h3>
                                <p>Transfira este projeto para outro usuário. Você se tornará um administrador.</p>
                            </div>
                            <Button text="Transferir" onClick={() => setIsTransferring(true)} style="generic_button" />
                        </div>

                        <div className="danger_action">
                            <div className="danger_text">
                                <h3>Excluir Projeto</h3>
                                <p>Esta ação é permanente e removerá todos os dados do projeto.</p>
                            </div>
                            <Button text="Excluir" onClick={() => setIsDeleting(true)} style="delete_button_bg" />
                        </div>
                    </section>
                )}
            </div>

            {isDeleting && (
                <AlertCard className="chat_card_confirmation" darken>
                    <h2>Excluir Projeto</h2>
                    <p>Tem certeza que deseja excluir "{project.name}"? Esta ação não pode ser desfeita.</p>
                    <div className="chat_card_delete">
                        <Button style="generic_button" onClick={() => setIsDeleting(false)} text="Cancelar" />
                        <Button style="delete_button_bg" onClick={handleDeleteProject} text="Excluir" />
                    </div>
                </AlertCard>
            )}

            {memberToRemove && (
                <AlertCard className="chat_card_confirmation" darken>
                    <h2>Remover Membro</h2>
                    <p>Tem certeza que deseja remover <strong>{memberToRemove.email}</strong> do projeto?</p>
                    <div className="chat_card_delete">
                        <Button style="generic_button" onClick={() => setMemberToRemove(null)} text="Cancelar" />
                        <Button style="delete_button_bg" onClick={() => handleRemoveMember(memberToRemove.email)} text="Remover" />
                    </div>
                </AlertCard>
            )}

            {editingMember && (
                <div className="modal_overlay" onClick={() => setEditingMember(null)}>
                    <div className="modal_content" onClick={e => e.stopPropagation()}>
                        <div className="modal_header">
                            <h3>Editar Permissões</h3>
                            <button className="close_modal" onClick={() => setEditingMember(null)}><i className="fi fi-rr-cross-small"></i></button>
                        </div>
                        <div className="modal_body">
                            <p>Ajuste o cargo e as permissões de <strong>{editingMember.email}</strong></p>
                            
                            <div className="input_group">
                                <label>Cargo</label>
                                <select 
                                    value={editingMember.role} 
                                    onChange={e => setEditingMember({...editingMember, role: e.target.value as any})}
                                    disabled={!isOwner && editingMember.role === "admin"}
                                >
                                    <option value="member">Membro</option>
                                    <option value="admin">Administrador</option>
                                </select>
                            </div>

                            {editingMember.role === "member" && (
                                <div className="permissions_grid">
                                    <label className="checkbox_group">
                                        <input 
                                            type="checkbox" 
                                            checked={editingMember.permissions.read} 
                                            onChange={e => setEditingMember({...editingMember, permissions: {...editingMember.permissions, read: e.target.checked}})}
                                        />
                                        <span>Ler Roteiro</span>
                                    </label>
                                    <label className="checkbox_group">
                                        <input 
                                            type="checkbox" 
                                            checked={editingMember.permissions.send_messages} 
                                            onChange={e => setEditingMember({...editingMember, permissions: {...editingMember.permissions, send_messages: e.target.checked}})}
                                        />
                                        <span>Enviar Mensagens</span>
                                    </label>
                                    <label className="checkbox_group">
                                        <input 
                                            type="checkbox" 
                                            checked={editingMember.permissions.create_chats} 
                                            onChange={e => setEditingMember({...editingMember, permissions: {...editingMember.permissions, create_chats: e.target.checked}})}
                                        />
                                        <span>Criar Novos Chats</span>
                                    </label>
                                    <label className="checkbox_group disabled">
                                        <input type="checkbox" checked={false} disabled />
                                        <span>Gerar Imagens (Em breve)</span>
                                    </label>
                                    <label className="checkbox_group disabled">
                                        <input type="checkbox" checked={false} disabled />
                                        <span>Gerar Vídeos (Em breve)</span>
                                    </label>
                                </div>
                            )}
                        </div>
                        <div className="modal_footer">
                            <Button text="Cancelar" onClick={() => setEditingMember(null)} style="generic_button" />
                            <Button text="Salvar" onClick={() => handleUpdateMember(editingMember.email, editingMember.role, editingMember.permissions)} style="projeto_button" />
                        </div>
                    </div>
                </div>
            )}

            {isTransferring && (
                <div className="modal_overlay" onClick={() => setIsTransferring(false)}>
                    <div className="modal_content" onClick={e => e.stopPropagation()}>
                        <div className="modal_header">
                            <h3>Transferir Propriedade</h3>
                            <button className="close_modal" onClick={() => setIsTransferring(false)}><i className="fi fi-rr-cross-small"></i></button>
                        </div>
                        <div className="modal_body">
                            <p>Digite o e-mail do novo proprietário. Ele deve ser um membro atual do projeto.</p>
                            <div className="input_group">
                                <label>E-mail do Novo Dono</label>
                                <select value={transferTargetEmail} onChange={e => setTransferTargetEmail(e.target.value)}>
                                    <option value="">Selecione um membro...</option>
                                    {project.members.map(m => (
                                        <option key={m.email} value={m.email}>{m.email}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="modal_footer">
                            <Button text="Cancelar" onClick={() => setIsTransferring(false)} style="generic_button" />
                            <Button text="Confirmar Transferência" onClick={handleTransferOwnership} style="projeto_button" />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
